Suspense Transitions

- Normal Server
  - Fast
    - Keeps the old screen up
  - Slow
    - Keeps the old screen up for a while, then moves forward to a blank white screen
  
- React App
  - Transitions right away to a big spinner
    - Then to some more spinners
      - Then some more spinners
        - Then we're there.
  - Slow backends, this is fine
  - Fast backends, this is really flashy and feels awful
  - Medium backends, really bouncy

- React Suspense
  - You're in control
    - fast backend, keep old page up
    - slow backend
      - throw spinner up on old page
      - transition to spinners on next page
    - pro mode
      - load first set of the page, then transition
      - preload the rest and it might be there when you need it



Beach body
---------

Nav
https://d1m0rv1xg9oqxv.cloudfront.net/navigation/thunderbird-nav

Main content
https://d1m0rv1xg9oqxv.cloudfront.net/v4/programs/p90x3

https://d1m0rv1xg9oqxv.cloudfront.net/components/every-goal
List of all the programs


