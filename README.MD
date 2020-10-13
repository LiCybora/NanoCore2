# Nano Adblocker For Firefox Is No Longer Maintained!

As of upstream [sell the project to unknown developers](https://github.com/NanoAdblocker/NanoCore/issues/362), I refuse to maintain the project for stranger(s) that never show up to introduce themselves to their users.

**NOTE: Unlike upstream, Nano Adblocker on this port is still under my control and not related to upstream's new developer(s)!**

For more details or questions, visit [my issue ticket](https://github.com/LiCybora/NanoDefenderFirefox/issues/187). If you can't read English, use a translator or raise your problem on [this issue ticket](https://github.com/LiCybora/NanoDefenderFirefox/issues/187) such that other volunteer can help.

## What Should I Do?!

1. Backup settings: In Nano Adblocker, Go to `Dashboard` > `Settings` > `Backup to files`. (Optional )
2. Backup Filter Lists: Take a screenshot of your Filter List such that you can recover later. (Optional)
3. Disable/Remove Nano Adblocker: In Firefox, Go to `Add-ons` and Disable Nano Adblocker. You may also remove it later if you sure everything are backup and reversible.

## But I Need An Ad-blocker!

Try [uBlock Origin](https://github.com/gorhill/uBlock) where Nano Adblocker forked from. Their interfaces are similar and quite easy to familiar with. You may restore most settings from Nano to uBlock Origin by:

1. In uBlock Origin, Go to `Dashboard` > `Settings`
2. Click `Restore from file...` and choose the file you backup from previous section.

Since uBlock Origin and Nano Adblocker do not share exactly same built-in filter list. In case restore cannot fully recover all filter list, you may manually add back according to the screenshot you take from previous section.

Of course, you are free to choose any ad-blocker you want! Above is just my personal recommendation.

## What If I Really Want to Use Nano Adblocker?

No problem, you can still use it. Filter list can still be updated and you can use it as usual. 

But it is not recommended because you won't receive update anymore. No fix will be released when you experience issue(s). In future, you may not be able to use filter rule that is written in new syntax which is released after the retirement.

## Timeline for Retirement
v1.0.0.154 will be the final version of Nano Adblocker. Extension will be unlisted from AMO one week after released, no more new installation form AMO. You may still install from [my repository](https://github.com/LiCybora/NanoCoreFirefox) after that if you really want Nano Adblocker back.

It is highly recommended to install alternative instead of continue using Nano Adblocker, however.

## Final Words from Maintainer
Thanks for all volunteer that contribute to this project. Also thanks for users reporting issue to benefit other users as well. Thanks for all users choose Nano Adblocker as their content-blocker.
Hope everyone can still enjoy clean web site in future.
# Nano Core 2 for Firefox

Restarting fresh on Firefox.

A patch driven fork of uBlock Origin.

Upstream commit pin: `76eaef4d2b13bbc1b64d230182cac8f6523a9b17` or `1.27.10`

The code of project is shared with [upstream](https://github.com/NanoAdblocker/NanoCore2) **before it is sold**.

**Please submit issues to the
[Nano Core issues tracker](https://github.com/LiCybora/NanoCoreFirefox/issues).**

## Localization

Nano Core 2 has some extra locale strings, most of them are for Nano Linter.

You can contribute to localization here:
https://crowdin.com/project/nano-adblocker

Your language is not listed? Submit an issue to let me know.

## Setup

1. Install latest version of Git and Node.js.
1. In an appropriate directory, run:
   1. `git clone --depth 1 https://github.com/LiCybora/NanoCore2.git`
   1. `git clone --depth 1 https://github.com/NanoAdblocker/NanoFilters.git`
   1. `git clone --depth 1 https://github.com/LiCybora/NanoDefenderFirefox -b moz`
1. Run `git clone https://github.com/gorhill/uBlock.git` in an appropriate
   directory to get upstream. Check out a tag or commit as appropriate.
1. In Nano Core 2 repository:
   1. Navigate to `/term` directory and run `npm install`.
   1. Update `/config.nano.js` as appropriate.
   1. Run `node ./term` to open Nano Core 2 Terminal.

Note: The private repository `Prototype` is required for publishing.

## Development

You should not modify the upstream repository, instead, use Nano Core 2
Terminal to create and manage development environment.

```
init	   Initialize source development environment
reset    Delete development environment and create a fresh one using upstream
         repository, uncommitted changes in the fresh development environment
         will be cleared
apply    Apply all existing patches, in order, starting from the beginning
sync     Resynchronize all existing patches, in order, starting from the
         beginning
cont     Clear uncommitted changes and continue to resynchronize patches
         starting from the last one that failed or from the beginning as
         appropriate
mark     Create a patch based on the difference between tip of resynchronize
         patches and current code in development environment

make     Build extension from development environment
pack     Build, test, then package the extension
check    Check the syntax of files under the "/src" directory
publish  Build, test, package, then publish the extension
         Optionally pass browser name to make/pack/publish for only one browser
clean    Remove all build files

lmake    Build English locale file from locale definition
lsync    Synchronize (non-English) locale files with the latest build of the
         Crowdin project
         This will not rebuild the Crowdin project even if there are changes

config   Print active configuration data
reload   Reload configuration data
exit     Exit the terminal
```

### Creating a New Patch

1. Run `mark`
1. Copy generated patch file to an appropriate directory
1. Give the new patch a good name
1. Add it to the README file
1. Add it to the configuration file
1. Run `reload` in the Terminal

### Renaming a Patch

1. Give the patch a new name
1. Update the README file
1. Update the configuration file
1. Run `reload` in the Terminal

### Removing a Patch

1. Delete the patch file
1. Update the README file
1. Update the configuration file
1. Run `reload` in the Terminal

## Version Update Checklist

1. Pull filters updates
1. If needed, pull upstream updates then update about string and commit pin
1. If needed, pull upstream updates to build scripts
1. If needed, pull upstream updates to `assets.json` and `manifest.json`
1. If needed, pull upstream updates to `1p-filters.js` and `asset-viewer.js`
1. If needed, build and pull locale updates
1. Bump version number
1. Perform [sanity tests](notes/sanity_tests.md)
1. Add tags to repositories, and upload packages
1. Upload packages to extension stores

## Version Update Extended Checklist

These are the potential problems to look out for:

1. Changes to development build detection logic
1. Changes to Font Awesome related CSS
1. Changes to image resources
   - Update build scripts to adapt
1. Changes to `/assets` directory structure
1. Changes to `scriptlets.js` format
   - Update build scripts and extended script snippets manifest to adapt
1. Changes to redirect declaration maps format in `redirect-engine.js`
   - Update `nano-background.js` to adapt
1. Renaming or removal of `messaging` and `popupData` variables in `popup.js`
   and `popup-fenix.js`
1. Changes to filters header parsing logic in `storage.js`
   - Update MirrorEngine to adapt
1. Changes to CNAME uncloaking Chromium support
   - Consider changing the default settings to disabled
1. Changes to local IP detection logic in `storage.js`
   - Update build scripts in NanoFilters and NanoMeow legacy server to adapt
1. Changes to filters syntax
   - Update NanoFilters, NanoContrib, and Nano Defender Integration to adapt
1. Changes to documented behaviors
   - Update documentations in NanoCore, NanoCore2, and NanoDoc to adapt

## Assets Manifest Update Checklist

1. When assets are removed
   - Open an issue in UltimateMirror to schedule removal of matching mirrored
     file
   - Remove the mirrored file after a few months
1. When assets that are enabled by default have changed
   - Update NanoFilters build scripts
   - Delete and refresh third party assets cache

## Subresource Integrity Incidence Response Protocol

When there is a severe issue with the content of a subresource, an intervention
can be easily placed with the help of
[UltimateMirror](https://github.com/NanoMeow/UltimateMirror) and
[MirrorEngine](https://github.com/NanoMeow/MirrorEngine):

1. Lock the subresource in UltimateMirror
1. Remove problematic content from UltimateMirror, if needed
1. Update `assets.json` so the sanitized subresource will be loaded from
   UltimateMirror

Later, the intervention can be lifted as follows:

1. Update `assets.json` as appropriate, the subresource should no longer be
   loaded from UltimateMirror
1. Wait a bit for cache to expire (takes about 10 minutes), then restart
   MirrorEngine
1. Unlock the subresource in UltimateMirror

## External Dependencies

1. Ace
   - `src-noconflict/ace.js` `15.04.20` (`1.4.10`)
   - `src-noconflict/ext-searchbox.js` `21.02.19`

## Tips

To update a patch, simply paste further changes to the bottom of that patch and
`sync` them in.

To fix conflict, either edit the broken patch file manually or disable it along
with patches after it then recreate the changes.
