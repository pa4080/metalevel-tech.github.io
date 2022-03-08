# Instead of a Menu

These are the active pages at this site:

* [GitHub Repo](https://github.com/metalevel-tech/JS-Advanced-React-ProgressBG-Homework) : [My homework at ProgressBG' JavaScript Advanced React Course](/js_homework/)
 
* [GitHub Repo](https://github.com/metalevel-tech/JS-Advanced-React-ProgressBG-Homework/tree/master/MDN.Exercises) : [My Progress at MDN's JavaScript Guide](/js_homework/MDN.Exercises/)
 
* [GitHub Repo](https://github.com/metalevel-tech/bindfs-to-home-bash) : [Bindfs to the User’s Home Directory Bash Script](/bindfs-to-home-bash/)
 
* [GitHub Repo](https://github.com/metalevel-tech/cron-gui-launcher) : [Launch a GUI Application from Crontab or within an SSH Session](/cron-gui-launcher/)


# Maintenance the Repository

* Maintenance the submodules at [metalevel-tech.github.io](https://github.com/metalevel-tech/metalevel-tech.github.io)

## Added repositories

```bash
git submodule add -b master https://github.com/metalevel-tech/JS-Advanced-React-ProgressBG-Homework js_homework
git submodule add -b master https://github.com/metalevel-tech/bindfs-to-home-bash.git
git submodule add -b master https://github.com/metalevel-tech/cron-gui-launcher.git
```

```bash
git submodule update --init --recursive
```


## Update the current repository's sub modules

```bash
git submodule update --recursive --remote
#git pull --recurse-submodules
git commit -m 'Comment'
git push
```

## References

* [GitHub Pages: Websites for you and your projects](https://pages.github.com/)

* [Stack Overflow: Adding existing repo as a page on GitHub Pages](https://stackoverflow.com/a/52437739/6543935)

* [GitHub Blog: Working with submodules](https://github.blog/2016-02-01-working-with-submodules/)

* [**Force Git submodules to always stay current**](https://stackoverflow.com/a/31851819/6543935)


