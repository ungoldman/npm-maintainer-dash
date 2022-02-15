# npm maintainer dash

experimental proof of concept to try getting a full list of a user's repos sorted by downloads in the last month.

was working fine until I hit the rate limit :X

## sample output

```
~/dev/lab/npm-maintainer-dash ∴ node index.js ungoldman
package                           downloads
-------------------------------------------
path-browserify                   61535007
stream-browserify                 58872366
tty-browserify                    55564636
timers-browserify                 54326072
vm-browserify                     51025606
console-browserify                49763118
browser-resolve                   23481222
acorn-node                        16259012
detective                         15706970
browserify                        8332828
static-eval                       7335125
module-deps                       5717179
insert-module-globals             5509994
deps-sort                         5328659
syntax-error                      5212757
stream-splicer                    5120288
browser-pack                      5108285
labeled-stream-splicer            5064047
static-module                     4546886
brfs                              4337146
watchify                          3823397
@choojs/findup                    786318
...
```

## why

wish npm did this for you! as a maintainer it's a pain to figure out how to prioritize package maintenance based on real-world usage. squeaky wheel often gets more attention than the thing 1m users are silently relying on etc etc
