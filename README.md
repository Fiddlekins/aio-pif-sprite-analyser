# aio-pif-sprite-analyser

Replicates, centralises and extends the bot and third party site sprite analysis tools.

Access it [here](https://fiddlekins.github.io/aio-pif-sprite-analyser/).

## Credits

Base and autogen fusion sprites sourced from [here](https://gitlab.com/infinitefusion2/autogen-fusion-sprites).

Source images and method for generating battler scenes sourced from [here](https://github.com/greystorm101/spritebot).

## Similarity Analysis

(Warning: here be colour theory jargon)

Our starting point is the [fusion bot](https://github.com/Aegide/bot-fusion-analyzer) as that is what is actively used as I write this.

The algorithm is as follows:

1. Get the set of pixel RGB values used in the image
2. Calculate the "colour delta" between all pairs of colours used
   1. [(Code)](https://github.com/Aegide/bot-fusion-analyzer/blob/main/bot/analysis_sprite.py#L336) Three colour distance values are calculated and returned as a tuple:
      1. The `CIEDE2000` distance
      2. The `CMC l:c` distance
      3. A loose approximation of the `sRGB Euclidean` distance
3. Determine whether this "colour delta" is considered "similar" (that is, the two colours in the pair are too similar to one another)
   1. A pair of colours is considered "similar" if _all_ three distance values are below their respective threshold value (that is, the pair is not similar if any one distance value is above its threshold). The thresholds are:
      1. `CIEDE2000`: 10
      2. `CMC l:c`: 10
      3. `sRGB Euclidean`: 32
4. Overall similarity score is the number of colour pairs that are considered "similar"

### Terminology

I don't have the expertise required to properly explain all of this, nor the time.
As such I will give a brief notion of what some of this stuff means, and provide links to more detailed reading.

#### Colour distance

This is an attempt to quantify the extent to which colours look [different](https://en.wikipedia.org/wiki/Color_difference) to the (typical) human eye and brain combination.
More distance, bigger perceived difference in colours.
A distance of zero, and the two colours are the same colour.

The name "distance" comes from this being a measure between two points in a "colour space".

#### Colour space

How do we represent colours in a numerical fashion? [Lots of mathematics](https://en.wikipedia.org/wiki/Color_space). 

##### RGB

You're likely familiar with one of the simplest approaches, RGB.
Here we have something like `rgb(100%, 0%, 0%)` that represents maximum red (r=100%), minimum green (g=0%) and minimum blue (b=0%).
Overall that produces the colour red.
RGB is widely used because it corresponds well with how typical monitors have pixels comprised of red, green and blue dots.

This way of representing colours as several numbers is called the [RGB](https://en.wikipedia.org/wiki/RGB_color_model) colour **model**.
This way of then agreeing that a certain number combination corresponds to an actual observed colour is called the RGB colour **space**.

There are, however, a great many different approaches that have been devised over the last century.
Some of these aim to improve on prior approaches in one way or another.
Others are intended to solve more specific problems.

##### HSV

You might be familiar with [HSV, HSB or HSL](https://en.wikipedia.org/wiki/HSL_and_HSV).
They each behave differently and some of their numbers represent different properties of colours, but they share the same general approach and intent.
These colour spaces are designed to be more intuitive for humans to reason about.

If I gave you a shade of orange and asked you to describe it in terms of how much red, green and blue there is in it then it is unlikely you will have an easy time giving a reasonably accurate answer.
If instead I asked you to guess its hue, saturation and brightness you would likely fare much better.

As such, with the HSV/HSB/HSL colour spaces we can specify colours in a more intuitive way, before converting them into an RGB representation for displaying on digital hardware.

This is an example of a colour space created to improve on a prior one.

##### CMYK

Conversely, consider [CMYK](https://en.wikipedia.org/wiki/CMYK_color_model), a colour space that describes colours in terms of cyan, magenta, yellow and black.
This was developed to be used for physical printing, where mixing these colours together absorbs the corresponding wavelengths of light, resulting in the leftover wavelengths being what we see.
This is a "subtractive" approach to mixing colours, versus the "additive" approach RGB uses because monitors are emitting those wavelengths instead.

This is an example of a colour space created to target a specific problem.

#### Perceptual uniformity

Many colour spaces are created to improve on a property called "uniformity".
This refers to whether a consistent change in the numbers that represent a colour correspond to a consistent change in how different that colour is perceived.

RGB is terrible for this.
HSV is bad at this.
[CIELAB](https://en.wikipedia.org/wiki/CIELAB) is decent at this.
[Oklab](https://bottosson.github.io/posts/oklab/) is OK at this (heehee).

#### Back to colour distance

In the fusion bot algorithm section I refer to:

1. `CIEDE2000`
2. `CMC l:c`
3. `sRGB Euclidean`

These are three separate ways of measuring distance, each corresponding to a colour space that this measurement takes place in.
From a mathematical perspective, basic distance metrics are literally how far away two points (representing colours) are in a (usually) 3D space.
More complicated distance metrics can exist for the same colour spaces, and involve tweaks to weight different colours more or less to try to smooth over perceptual non-uniformities.

1. [CIEDE2000](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000) is a distance in CIELAB colour space, created in 2000 to improve handling of non-uniformities
2. [CMC l:c](https://en.wikipedia.org/wiki/Color_difference#CMC_l:c_(1984)) is a distance in CIELCh colour space (a transformation of CIELAB from cartesian to polar coordinates, created in 1984 to improve intuitiveness of the parameters but otherwise behaving similarly)
3. [sRGB Euclidean](https://en.wikipedia.org/wiki/Color_difference#sRGB) is distance in the sRGB colour space, which is a version of RGB colour space that lots of people agree on.
   1. (Note: fusion bot doesn't actually use the Euclidean distance, but instead computes the delta between each channel for two RGB colours and returns the highest delta. This is significantly less accurate as distance vectors that are parallel to the channel axes are weighted as far more distant than those that are not) 

### Analysis of the fusion bot approach

Based on my observations, the end result is imperfect.
Users often remark on it being a rough metric, and loosely use it with the overall colour count to suggest when a sprite should have its colours more closely examined or be considered good as is.
As a consequence, there are cases where a sprite will low (but non-zero) colour similarity is given the okay, despite closer examination revealing that it suffers from the textbook example - use of both #000000 and #101010 for different portions of the outlines.
It is my hope that APSA's implementation of this feature can operate more objectively, in addition to benefiting from the interface allowing easier communication of more information.

First and foremost, I'm not convinced by the triple distance approach.

It's unclear to me when the sRGB distance is actually the determining factor, as it's more likely to produce over-estimates than under-estimates.
For it to change the outcome, there would need to be a scenario where the other two distance values fail to meet their threshold and this sRGB is the one that beats it.
This does of course depend on the threshold used though, and I haven't bothered crunching the mathematics required to figure out what impact the threshold used has.

In general though, it's a highly inaccurate way to measure perceptual difference between colours and any attempt to make it have an impact on the final outcome by fine-tuning its threshold is going to introduce false negatives.

As for the other two distance metrics, I believe one is redundant.
The CMC l:c distance operates on a colour space that's just a coordinate transformation of the colour space used by CIEDE2000, so my understanding is that there's nothing beyond the difference in distance implementations themselves having an impact.
In that regard, I understand CIEDE2000 to be a superior way of determining distance due to the extra work done to address perceptual non-uniformities when creating it.

Secondly, I think that after reducing it from three to one distance measurements, the actual measurement used could be improved too.
In recent years a new colour space called [Oklab](https://bottosson.github.io/posts/oklab/) has been created which attempts to go further still in reducing non-uniformities (alongside some other target features).

I'm a simple creature and so my verdict lies with the [circle diagrams](https://bottosson.github.io/posts/oklab/#munsell-data) definitely looking more circular for Oklab than for CIELAB.
There is also [this](https://raphlinus.github.io/color/2021/01/18/oklab-critique.html) analysis with a fun interactive widget that displays how the different colour spaces handle gradient transitions, but that's not quite relevant to the distance measures. 

### Conclusion

To summarise, for APSA I use the same overall algorithm of counting up how many colour pairs are similar, but instead of the three distance measurements fusion bot uses I will use just one, and it will be using Oklab instead of CIELAB.

**EDIT: after implementing it I did not get the results I was hoping for, and for now have fallen back to replicating the fusion bot implementation.
I plan to revisit this to see if I can fine tune it some other way.**
