/*
 * jQuery Scrollify V1.0
 * https://github.com/nubz/jquery-scrollify
 * 
 * requires jQuery 1.7+
 *
 * Copyright 2012, Alistair Macdonald
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 * 
 * Creates vertical scrollers from divs containing a single unordered list 
 * with navigational links 
 * there is rather prescriptive mark-up and CSS required to ensure relative 
 * positioning and overflow control e.g. (only the h3 is not optional - any html can go here)
 * 
 *  <div class="menu-panel" id="menu_1">    
            <h3>menu title</h3>    
            <a href="#" class="up disabled">up</a>
            <div class="menu-window">    
                <ul class="menu">
                    <li><a href="#">item one</a></li>
                    <li><a href="#">item two</a></li>
                    <li><a href="#">item three</a></li>
                    <li><a href="#">item four</a></li>
                    <li><a href="#">item five</a></li>
                    <li><a href="#">item six</a></li>
                    <li><a href="#">item seven</a></li>                
                </ul>
            </div>
            <a href="#" class="down disabled">down</a>    
       </div>
 * 
 * div.menu-panel { background-color:#F47A23;  position:relative; width:30%; margin:5px auto; padding:5px;}
 * div.menu-panel ul { list-style:none; padding-left:0; padding:5px; margin:0; position:relative; }
 * div.menu-panel ul li { margin-bottom:2px; height:26px; overflow:hidden; }
 * div.menu-panel ul li a {  line-height:16px; text-decoration:none; display:block; background:#eee; padding: 6px; border-bottom:1px dotted #999; }
 * div.menu-panel ul li a:hover,
 * div.menu-panel ul li a.selected { color:#fff; background:#ccc; font-weight:bold; }
 * div.menu-panel ul li a:hover,
 * div.menu-panel ul li a.selected { background:#1DA1BF; }
 * div.menu-panel div.menu-window {background:#fff; overflow:hidden; padding:0 8px; height:180px; position:relative; font-size:11px; margin:0; }
 * div.menu-panel div.menu-window .loading-menu {  padding:75px 85px; z-index:20; position:absolute;}
 * div.menu-panel a.up,  div.menu-panel a.down { margin:0; display:block; text-align:center; padding:5px 0;}
 * div.menu-panel a.disabled { opacity: 0.3; filter: alpha(opacity=30); cursor: default; }​
 * 
 * to get more easing options use with jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 */

(function($) {

    $.fn.scrollify = function(method) {

        //private vars
        var $up_btn = this.find('a.up'),
            $down_btn = this.find('a.down'),
            $menu_list = this.find('ul.menu'),
            viewable_area = this.find('div.menu-window').height(),
            menu_height = $menu_list.height(),
            max_scroll = -menu_height,
            item_height = $menu_list.find('li').filter(':first').height(),
            move_amount = viewable_area - (item_height * 2),
            start_pos = 0;

        //configurable settings
        var settings = $.extend({
            'duration': 'slow',
            'easing': 'swing',
            'top_margin': 0,
            'current_selection': null,
            'selection_position': 'center' //can be top or center
        }, method);

        var methods = {

            init: function() {

                if (viewable_area < menu_height) {
                    $down_btn.removeClass('disabled');
                }

                $up_btn.on('click.scrollify', function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('disabled')) {
                        return false;
                    }
                    if (settings.top_margin + move_amount <= 0) {
                        settings.top_margin += move_amount;
                    } else {
                        settings.top_margin = 0;
                        $(this).addClass('disabled');
                    }
                    methods.scrollto(settings);
                });

                $down_btn.on('click.scrollify', function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('disabled')) {
                        return false;
                    }
                    if (settings.top_margin - viewable_area >= max_scroll) {
                        settings.top_margin -= move_amount;
                        $up_btn.removeClass('disabled');
                        methods.scrollto(settings, 'click');
                    } else {
                        $(this).addClass('disabled');
                    }
                });

                if (settings.current_selection) {
                    $menu_list.find('li:eq(' + settings.current_selection + ') > a').addClass('selected');
                    start_pos = settings.current_selection * item_height;
                    if (start_pos > move_amount) {
                        settings.top_margin = (settings.selection_position == 'center') ? -start_pos + (viewable_area / 3) - (item_height / 2) : -start_pos;
                        return methods.scrollto(settings, 'init');
                    } else {
						return methods.scrollto(settings, 'init');
					}
                }
            },

            scrollto: function(settings, callee) {
                $menu_list.animate({
                    marginTop: settings.top_margin + 'px'
                }, {
                    duration: settings.duration,
                    easing: settings.easing,
                    complete: function() {
                        if (settings.top_margin >= 0) {
                            $up_btn.addClass('disabled');
                            if(callee == 'click')
                                self.trigger('reachedtop');
                        }
                        if ((settings.top_margin - viewable_area) < max_scroll) {
                            $down_btn.addClass('disabled');
                            if(callee == 'click')
                                self.trigger('reachedbottom');
                        } else {
                            $down_btn.removeClass('disabled');
                        }
                    }
                });
            },
            
            refresh: function(){
				menu_height = $menu_list.height();
				max_scroll = -menu_height;
				return methods.init();
			}
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jquery.scrollify');
        }

    };
})(jQuery);
