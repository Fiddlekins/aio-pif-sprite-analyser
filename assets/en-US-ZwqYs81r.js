const e=JSON.parse(`{"s1DuVv":["Sprite ID"],"gmfgg6":["This is an ID generated from the raw pixel data of the sprite after it has been decoded and, if necessary, scaled to 288x288."],"OkFErj":["The full ID is:<0/>",["id"]],"Yqa2To":["Input File: <0/>"],"XVDtl+":["Awaiting input"],"l3s5ri":["Import"],"GS+Mus":["Export"],"kbIovC":["Analysis Report"],"nwLEhA":["Partial Pixels"],"gVn3K8":["Semi-Transparency"],"NJQ1sM":["Colored Transparency"],"gMe7xN":["Color Count"],"iG/7F3":["Color Similarity"],"Ho88+4":["Configure Battler"],"uxcOSl":["Sprite Position Override"],"Ti+d3K":["Position Override"],"FraIvl":["Pokemon Infinite Fusion uses the sprite position offsets configured for the body pokemon of the fusion when determining where to draw it."],"KQq9mW":["This can be overridden using the settings below, but these changes will not transfer into the game."],"CvT/3f":["Be sure to use the body pokemon configuration when fine-tuning sprite placement."],"T8zR7h":["The sprite position derived from the body pokemon can be overridden"],"bGQplw":["Body"],"OfhWJH":["Reset"],"4HBFYh":["Map"],"EdQY6l":["None"],"rUcqYi":["Select Pokémon"],"eqRr09":["Pokémon"],"cLpnRe":["Allow Export Copying"],"I9It55":["Allow export copying"],"O7hPlM":["Browsers re-encode images when they are copied to the clipboard, in order to prevent malicious websites from exploiting applications the browser may paste into."],"N1822C":["This re-encoding produces bloated PNG images and ignores indexed mode, making the export process pointless."],"RojkAx":["Power users may however wish to use the application to quickly rescale sprites before pasting the result into an image editor, where this re-encoding does not cause problems. Enabling this setting permits this workflow."],"1ZPxOE":["Canvas Acceleration"],"20KU73":["Leave this enabled unless you get corrupted images displaying, as it is faster and more accurate. Some browsers feature privacy settings that cause the Canvas API to output randomised image data, at which point Canvas Acceleration should be disabled."],"fhsdmW":["Ignore Colored Transparency"],"ghgcuD":["The application will skip over the colored transparency analysis when determining which view the app should automatically navigate to after importing a sprite. This makes the experience smoother for users who prefer to ignore this non-critical aspect."],"j7TQGe":["Autodetect"],"vXIe7J":["Language"],"0JImaB":["Number Formatting"],"XTwWRU":["Match Language"],"FEr96N":["Theme"],"D+NlUC":["System"],"Tz0i8g":["Settings"],"AWhY0Q":["Spot some errors? Notice a missing language? Read more <0>here</0> if you're interested in helping!"],"sxkWRg":["Advanced"],"Z86YNN":["The following settings disable some of the safety rails built into the application. Please only use them if you know what you're doing."],"cifPni":["Copying is disabled"],"k2wFXj":["This re-encoding produces bloated PNG images and ignores indexed mode, making this export process pointless."],"I+sXgs":["Downloading images does not suffer from this issue."],"Yc2fkK":["Unable to encode in indexed mode due to color count exceeding 256."],"fTHdRj":["Export Sprite"],"4of7rb":["Export sprites in a variety of formats."],"nEK3FR":[["width"],"x",["height"]],"CsekCi":["Normal"],"I3/r1f":["Indexed"],"rVuW85":["Normalise Transparency"],"fTI1Kk":["When enabled, any pixel with 0% opacity will be set to transparent black (a.k.a. \\"#0000\\", \\"rgba(0,0,0,0)\\", etc)."],"HBIYLp":["This changes nothing visually about the image, but reduces the filesize and has better compatibility with some software."],"7I5JuL":["Under normal circumstances this should be left enabled."],"JX+D4y":["File is invalid size: ",["resolutionString"]],"2pVEFP":["The requested host site blocks fetching outside whitelisted domains"],"3Qb3u/":["No suitable data found on clipboard"],"wO/btm":["File not recognised as an image"],"SlyWUW":["Import Sprite"],"JguvqZ":["Accepts images that are ",["acceptedDimensionsText"]," pixels in size."],"GVlMXV":["Drag 'n' drop some files here, or click to select files"],"t/YqKh":["Remove"],"GtJbUa":["Background"],"KkB9L8":["Coloured Transparent Pixel Count: <0/> (<1/>)"],"ctelZV":["These are pixels that are fully transparent (the alpha channel = 0) but contain color data instead of being invisible black."],"hfChis":["They do not cause any visual problems normally, but some software will behave differently due to their presence, so it is best to remove them."],"9nWAdn":["They are caused by specific software not enforcing that full transparency is transparent black."],"6TvYiw":["Contrast"],"A62nTS":["Opaque Color"],"NtXOHv":["Pixels highlighted green are either transparent black or not fully transparent. Pixels highlighted red are colored transparent pixels, and should be fixed."],"fX/NEL":["Colored transparent pixels are set to be fully opaque, and should be fixed. Valid pixels are left invisible. This mode is more whimsical than it is useful."],"dBlhUT":["Note: The following analysis can be helpful but is not required to pass for a sprite to be considered valid."],"2v97nW":["If fixing this is desired you can use the \\"",["exportOptionName"],"\\" option in the Export menu to save a copy of your sprite with the colored transparency removed."],"zqsJw2":["For users that frequently find their software is introducing colored transparency, you might prefer to ignore these warnings. You can find an option to suppress them in the Settings menu."],"7doohW":["Colour Count: <0/>"],"tlGwAT":["This is the number of \\"sprite colors\\" present, where a \\"sprite color\\" refers to a color that isn't fully transparent."],"wLT0ih":["The sprite guidelines limit this to ",["spriteColourCountLimit"]," colors, but fewer is preferable for typical sprites."],"Kk55fy":["Monotone"],"xYG/fs":["Negative"],"BulyBf":["Rotate"],"N3Lln0":["Clear Highlights"],"NDqYoC":["Pairs of similar colours: <0/>"],"yne+6a":["Skipped due to colour count exceeding <0/>"],"KO8OMo":["This is the number of pairs of colors that are considered to be too visually similar to one another."],"d7itqz":["This is an imprecise metric due to being quite subjective, and some pokémon palettes are more prone to high similarity than others."],"vyQRfR":["The sprite guidelines require artists to reduce this number where possible, and then check with other artists if they think the remaining similar colors are important to keep."],"OXOTHU":["Transparency"],"xHwgs0":["Colors"],"j7XRIa":["Partial Pixel Count: <0/> (<1/>)"],"tXYbJx":["Each 3x3 square of pixels should be the same color."],"+UN6+J":["Mixed"],"g2Tj8R":["Full"],"M6ELyu":["Pixels highlighted red are colors that do not match the majority color in their 3x3 square."],"6yl+Uq":["Pixels highlighted blue are colors that are the majority color in their 3x3 square, but still suffer from being in a partial pixel."],"BsOMdY":["Semi-Transparent Pixel Count: <0/> (<1/>)"],"xIvzha":["Semi-transparent pixels are neither fully opaque nor fully transparent."],"/nmFYF":["They are permitted if used intentionally."],"6jAi8c":["Range"],"e7+eir":["Pixels highlighted green if they are fully opaque or fully transparent. Pixels are highlighted red if they are partially transparent, and may be a mistake."],"FvyjPg":["Pixels highlighted green if they are fully opaque or fully transparent. Pixels are highlighted a hue between blue and red if they are partially transparent, where blue represents more transparency and red represents more opaqueness."],"UzXCoi":["[greyscale]."],"CpG1V4":["[red,green,blue]."],"UXYlZi":["[red,green,blue,alpha]."],"LHCvYY":["[greyscale, alpha]."],"hAN0hP":["PNG Info"],"2+NFOG":["The image is ",["width"]," pixels wide and ",["height"]," pixels high."],"+M1CGa":["The image is Color Type ",["colorType"],"."],"MoG6Uv":["Each pixel is a grayscale sample."],"93IeRU":["Each pixel is a Red, Green, Blue triple."],"exmZub":["Each pixel is a palette index."],"2uGHy0":["Each pixel is a grayscale sample, followed by an alpha sample."],"DNYDFS":["Each pixel is a Red, Green, Blue triple, followed by an alpha sample."],"Ilw1L8":["The palette colors are defined using ",["bitsPerChannel"]," bits per channel."],"ZihbrE":["The pixels are defined using ",["bitsPerChannel"]," bits per channel."],"3qxhP9":["The palette colors are defined using ",["channelCount"]," channels: ",["colourTypePixelFormat"]],"AL04lP":["The pixels are defined using ",["channelCount"]," channels: ",["colourTypePixelFormat"]],"Zb0teh":["The file size is <0/>."],"f7bZZX":["Autogen"],"rhEkXj":["Head"],"i66t4D":["Select Head Pokémon"],"jQfOlf":["Select Body Pokémon"],"VUSiGx":["Background Colors"],"knhKuu":["Color"],"7FaY4u":["Usage"],"ujtU9L":["Color A"],"SY1z4I":["Color B"],"/eJX8N":["Similarity"],"WPLqZt":["Similar Color Pairs"],"NxPDi5":["Sprite Colors"],"CFhvoB":["Colored Transparent Pixel Count: ",["0"]," (",["1"],")"],"WYljw1":["Color Count: ",["0"]],"CTkn2j":["Pairs of similar colors: ",["0"]],"ar4WoJ":["Skipped due to color count exceeding ",["0"]],"fx660A":["Partial Pixel Count: ",["0"]," (",["1"],")"],"U7i8X3":["Semi-Transparent Pixel Count: ",["0"]," (",["1"],")"],"W8dk6r":["The file size is ",["0"]," bytes."]}`);export{e as messages};
