# tabs.js

## Description
Provides a simple JavaScript class `Tabber` for creating dynamic tabs on a web page.

## Usage
By default, the first tab is active.

```html
    <!-- <nav> must have an id of the format <target>-menu -->
    <nav id="my-tabs-menu"></nav>
    <div id="my-tabs">
        <!-- <section>s must have data-title specified -->
        <section data-title="Tab 1">
            <p>Content for Tab 1</p>
        </section>
        <section data-title="Tab 2">
            <p>Content for Tab 2</p>
        </section>
        <section data-title="Tab 3">
            <p>Content for Tab 3</p>
        </section>
    </div>
    
    <script type="text/javascript">
        var tabs = new Tabber("tabs");
    </script>
```