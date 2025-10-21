# todo
[x] parse input 
[x] extract map as grid (array of rows, each row is array of chars)
[x] extract movements as array of strings
[] predict the robot movements
  A movement is as follows:
    - if robot or box meets a wall (#) in the direction of movement, it stops moving in that direction
    - if robot meets empty space (.) in the direction of movement
      - robots and dot swap places
    - if robot meets any box (0) in the direction of movement
      - if the char next to the box is empty space (.)
        - box and dot swap places
        - robot and box swap places
      - if the char next to the box is wall (#) return
      - if the char next to the box is another box (0)
        - check char after that box recursively until
          - empty space (.) found: move all boxes one space forward, then move robot and first box
          - wall (#) found: stop moving
          - end of grid found: stop moving
    ideas for recursion:
     - breaking conditions: 
      - if next chat is wall (#) return;
      - else if next char is empty space (.) swap current box with the (.)
      - else 
        - if next char is box (0) call function recursiveluy
[] calculate the robot 