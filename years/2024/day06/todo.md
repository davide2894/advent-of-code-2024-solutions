....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...

this above is my input.

questions that come to my mind:
- should i trat the input as a array of arryas or just line by line?
- how do i handle the '^' character?
- how do i handle the '#' character?
- how do i handle the '.' character?

one thing at a time.
Directions:
- if i have a "^" -> movement is up
- if i have a ">" -> movement is right
- if i have a "v" -> movement is down
- if i have a "<" -> movement is left

Next step to handle:
- if there is a "#" -> that's an obstacole
- if there is a "." -> that's an empty space i can move to



- define count = 0

the following procedure needs to be repeated until next character or index is out of bounds. 

- find the first line that has a "^" or ">" or "v" or "<" character and save the index of that line
- if direction is up
  - if prev line index is out of bounds, return count
  - get the character in the previous line at the same index
    - if char is "." 
        - char becomes "^"
        - current char at current line becomes "X"
        - count++
    else if char is "#"
        - set direction to "right" 
        - char becomes ">"
        - current char at current line becomes "X"
        - obstacle remains the same char no change
    - current line current index becomes "X"
    - count++
- if direction is right
  - if next char index is out of bounds, return count
  - process line horizontally like a normal array
    - if next char is "."
        - char becomes ">"
        - current char at current line becomes "X"
        - count++
    else if next char is "#"
        - set direction to "down"
        - char becomes "v"
        - current char at current line becomes "X"
        - obstacle remains the same char no change
- if direction is down
  - if next line index is out of bounds, return count
  - process line vertically like a normal array
    - if next char is "."
        - char becomes "v"
        - current char at current line becomes "X"
        - count++
    else if next char is "#"
        - set direction to "left"
        - char becomes "<"
        - current char at current line becomes "X"
        - obstacle remains the same char no change
- if direction is left
  - if previous char index is out of bounds, return count
  - reverse process line horizontally like a normal array
    - if previous char is "."
        - char becomes "<"
        - current char at current line becomes "X"
        - count++
    else if previous char is "#"
        - set direction to "up"
        - char becomes "^"
        - current char at current line becomes "X"
        - obstacle remains the same char no change
