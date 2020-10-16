
## Migrating to uBlock Origin

Due to the many differences, I strongly recommend you to copy the settings over
manually instead of using the backup and restore feature. Below are the details
about the differences between Nano Adblocker and uBlock Origin which should
hopefully assist you with a smooth transition:

- Filter editor/viewer and syntax highlighter
  - uBlock Origin has its own editor/viewer which should be overall an upgrade,
    but a few minor features are missing:
    - Double-click to select domain is not supported (you can always drag to
      select)
    - Search and replace is not supported (you can use an external editor)
    - The search widget is simpler and lacked a few features (explicit mode
      toggles, search in selection, etc.)
      - It supports regular expression, so it is not really less powerful, just
        that it can be a bit harder to use
- Filter linter
  - uBlock Origin does not have display explicit linting warnings and errors,
    but its syntax highlighter is a lot better at highlighting invalid filters
- Extra redirect and script snippet (scriptlet) resources
  - The most useful resources became part of uBlock Origin over the years
  - You can load the rest into uBlock Origin with advanced settings, ~~but this~~
    ~~is strongly discouraged (since the extra resources are unmaintained), so~~
    ~~please only do so if you are absolutely sure that you know what you are~~
    ~~doing~~
- Quick Issue Reporter
  - ~~You can still use the Quick Issue Reporter through Nano Defender~~
- Force scroll mode
  - Although less convenient, it is possible to emulate force scroll mode with
    a filter rule, simply replace `example.com` with the domain you want to
    force scroll
    ```
    example.com##*:style(overflow: auto !important;)
    ```
- Visualize hidden elements with the DOM inspector
  - It should start to work in uBlock Origin once this Chromium issue is
    resolved (you can star it to give it more weight):
    - https://bugs.chromium.org/p/chromium/issues/detail?id=1101473
- Short aliases for filter options
  - uBlock Origin now supports most of these aliases, with the exception being
    the `iframe` option, if you have custom filters using `iframe`, be sure to
    change them to `frame`
- Settings
  - Settings in the dashboard may have different default values and/or be at
    different places, when copying settings, be sure to read the description
    text for each option instead of going by the order in which the options
    appear
- Advanced settings
  - Nano Adblocker has different default values for some advanced settings,
    these are mostly subjective, but if you like the tweaked values better, you
    can copy them over
  - Nano Adblocker also has a few extra advanced settings options, but I
    question their usefulness since I never found myself using them
    - uBlock Origin does not have the force recompile button in the advanced
      settings page, but the button is only useful alongside the extra options
      that uBlock Origin does not currently have
- Other small changes
  - uBlock Origin swallows all script snippet (scriptlet) errors, this should
    only affect filter list maintainers, if you are affected, you can give the
    `debugScriptletInjector` advanced setting a try
  - uBlock Origin will only show the refresh button in the extension popup
    panel if there were changes, but you can simply use the native refresh
    button of your browser
  - Nano Adblocker comes with a slightly different set of default filter lists,
    you can subscribe to the extra filter lists if you want ~~(be sure to check~~
    ~~whether the lists are still maintained, remember that Nano Filters are no~~
    ~~longer maintained!)~~
  - To hard purge cached assets in uBlock Origin, you need to click the button
    (in the filter lists tab of the dashboard) while holding both `Ctrl` and
    `Shift` keys, instead of either `Ctrl` or `Shift`
  - When restoring uBlock Origin to default settings, the statistics in the
    extension popup panel is not cleared, you can clear them by doing a
    reinstall instead of using the restore to default settings feature
  - Nano Adblocker caps filter lists update interval to 60 days, uBlock Origin
    does not enforce a cap
  - If configured in the assets manifest (which cannot be modified by users),
    Nano Adblocker will revert the update interval to a default value when the
    update interval header is removed, uBlock Origin does not have this feature
    - I do not even remember why I implemented this...
