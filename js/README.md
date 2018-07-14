# header.js

## Examples
http://www.vincela.com/projects/ is an example of a webpage using *header.js*

## Usage
To use header.js on your web site, simply download:
* header.css
* header.js

And include them in the <head> of your webpage like:
```
<link href="header.css" rel="stylesheet" type="text/css">
<script src="header.js" type="text/javascript"></script>
```

Then, for the element that you want to use as a navbar, give it the id="navbar-top" attribute, e.g.:
```
<nav id="navbar-top">
    <a href="">Home</a>
    <a href="">About</a>
    <a href="">Contact</a>
    <a href="">Blog</a>
    <a href="">Portfolio</a>
</nav>
```

The test.html file provides an example of how to implement header.js.

## Modification
The included CSS file applies a default styling to the navbar which you might want to modify or remove. Furthermore, in the CSS you can change the color, size, and other attributes of the shadow.

For more advanced users, the original SASS (.scss) files are also included in this repository.
