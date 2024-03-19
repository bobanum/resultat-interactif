# Indications

## Indicators

### width/height
- Line with arrows.
- Inside if the length allows it, otherwise outside.
- The label can be on the left, the right, the center or outside.

- We can determine an "offset" relative to the pointed area.

- We can determine the top/bottom or left/right positioning.
- Elements : 
    - `<dimension>{legend}</dimension>`
        - *`type` (`height`, `width`, `diagonal`)
        - *`{box}`
### padding/margin
- 4 carrés de la bonne taille alignés sur les bords de la zone pointée. / 4 rectangles of the right size aligned on the edges of the pointed area.
- 1 line with the label goes to one of the squares (if the 4 values are the same). 
- Can point to multiple elements.
- Beyond a certain size, the squares become rectangles with a fixed thickness for all rectangles of this type.
- Elements :
    - `<spacing>{legend}</spacing>`
        - `size`
        - `type` (`padding`, `margin`)
### dotted box
- Dotted rectangle (or other) with legend at the top, bottom (or on the sides).
- Legend usually centered, but can be aligned differently.
- Elements :
    - `<box>{legend}</box>`
        - `{box}`
### Highlighting/circling
- Semi-transparent or bordered rectangle or oval.
- With label and line.
- Can be multiple with one label and several lines.
- Elements :
    - `<highlight>{legend}</highlight>`
        - `{box}`

        
## Specificities
- The positions can be relative to:
    - the image (so absolute)
    - a certain global area determined (margins)
    - the indicated element
    - another indicator

- The lines can be:
    - straight (at an angle if necessary)
    - squares
    - rounded squares
    - bezier or spline curves

- Intersections can be:
    - se chevauchent/overlap
    - cross each other with a small space
    - bridged (with a curved line)


### Global elements
- `<legend>{HTML}</legend>`
    - `offset`
    - `position` (`top`, `bottom`, `left`, `right`, `inner-top`, `inner-bottom`, `inner-left`, `inner-right`, "coordinates")
    - `align`


### Global attributes

- `{box}`
    - `x`
    - `y`
    - `top`
    - `right`
    - `left`
    - `bottom`
    - `width`
    - `height`
- `style` : General SVG CSS properties