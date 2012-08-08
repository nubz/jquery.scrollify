# jquery.scrollify

A simple menu wrapped in an up/down scrolling window

## Requires

jQuery 1.7+

## Installation

Include script *after* the jQuery library (unless you are loading or packaging scripts in another way):

    <script src="/path/to/jquery.scrollify.js"></script>

## Usage

Create a scrollify menu from an unordered list:

    $('div.menu-panel').scrollify();

Be sure to include this JavaScript after your HTML has rendered or inside a $(document).ready(){ ... } wrapper

You may include multiple menus on the same page

## Options

Options can be fed into the intitialisation of the plugin, this example shows all options being set:

    $('div.menu-panel').scrollify(
            'duration': 'slow',
            'easing': 'swing',
            'top_margin': 0,
            'current_selection': null,
            'selection_position': 'center'
    );

    duration : slow
    
can be a time value (in ms) e.g. 500 or fast or slow, this is the duration of the animation between scroll positions

    easing : swing
    
to get a wider range of easing options include a plugin such as jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/

    top_margin : 0
    
this is a pixel value and will determine the start position of the menu

    current_selection : 0
    
an integer to determine which list item should be highlighted, the integer should be the index of the li which is a zero indexed list

    selection_position : center
    
where to position the highlighted item within the menu window, valid values are 'top' and 'center'

## Changelog

## Development

- Source hosted at [GitHub](https://github.com/nubz/jquery-scrollify)
- Report issues, questions, feature requests on [GitHub Issues](https://github.com/nubz/jquery-scrollify/issues)

## Authors

[Alistair Macdonald](https://github.com/nubz)
