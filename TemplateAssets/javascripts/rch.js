// Core RCH JS file. Note: also used on ww2.rch.org.au
$(document).ready(function () {
    Site.init();
    Google.init();
});

var Site = {
    init: function () {

        // Detect if we are on IE, and which version. http://stackoverflow.com/questions/19999388/check-if-user-is-using-ie-with-jquery 
        function detectIERCH() {
            var ua = window.navigator.userAgent;

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/index.html');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/index.html');
            if (edge > 0) {
                // IE 12 => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
        }

        thisBrowserVersion = detectIERCH();

        

        // BS Tab bookmarks
        // Javascript to enable link to tab
        //if ($('.nav-tabs').length != 0) {
        //    var tabsUrl = document.location.toString();
        //    if (tabsUrl.match('#')) {
        //        $('.nav-tabs a[href=#' + tabsUrl.split('#')[1] + ']').tab('show');
        //    }

        //    // Change hash for page-reload
        //    $('.nav-tabs a').on('shown.bs.tab', function (e) {
        //        window.location.hash = e.target.hash;
        //        window.scrollTo(0, 0);
        //    })
        //}

        // Add # bookmark to URL
        var hash = window.location.hash;
        if ($('ul.nav a[href="' + hash + '"]').tab('show'));

        // Tabs
        if ($('.nav-tabs a').click(function (e) {
            $(this).tab('show');
            var scrollmem = $('body').scrollTop();
            window.location.hash = this.hash;
            $('html,body').scrollTop(scrollmem);
        }));

        // RCH accordions
        if ($('.rch-accordion a').click(function (e) {
             jQuery(this).tab('show');
             var scrollmem = $('body').scrollTop();
             window.location.hash = this.hash;
             $('html,body').scrollTop(scrollmem);
        }));

        // Twitter bootstrap accordions
        if ($('.panel-heading a').click(function (e) {
             jQuery(this).tab('show');
             var scrollmem = $('body').scrollTop();
             window.location.hash = this.hash;
             $('html,body').scrollTop(scrollmem);
        }));

        // Button
        if ($('.rch-button').length != 0) {
            $(".rch-button").button();
        }

        // Radio set
        if ($('.rch-radioset').length != 0) {
            $(".rch-radioset").buttonset();
        }

        // Checkbox set
        if ($('.rch-checkboxset').length != 0) {
            $(".rch-checkboxset").buttonset();
        }

        // Accordions
        var accordionIcons = {
            header: "fa fa-chevron-right",
            activeHeader: "fa fa-chevron-down"
        };

        if ($('.rch-accordion').length != 0) {
            $(".rch-accordion").accordion({
                heightStyle: "content",
                collapsible: true,
                active: false,
                header: "h2",
                icons: accordionIcons
            });

            //If there is a hash in the URL, then set the accordian to open on that target
            //console.log(window.location.hash);

            //if (window.location.hash.length != 0) {
            //    var thisAccordian = $('.rch-accordion > h2').index($(window.location.hash));
            //    //console.log("Accordian index: " + thisAccordian);
            //    if (thisAccordian != '-1') {
            //        $(".rch-accordion").accordion("option", "active", thisAccordian);
            //    }
            //}

            //Todo - set the #fragment on activating a new accordain.
        }

        // Cycle2 plugin
        //if ($('.cycle-slideshow').length != 0) {

        //    $.getScript("/TemplateAssets/jquery/plugins/cycle2/jquery.cycle2.min.js")
        //    .done(function () {
        //        //alert('cycle2 loaded');
        //    })
        //    .fail(function () {
        //        alert('jquery.cycle2.min.js did not load.');
        //    });

        //    $.getScript("/TemplateAssets/jquery/plugins/cycle2/jquery.cycle2.swipe.min.js")
        //    .done(function () {
        //        //alert('cycle2.swipe loaded');
        //    })
        //    .fail(function () {
        //        alert('jquery.cycle2.swipe.min.js did not load.');
        //    });

        //    $.getScript("/TemplateAssets/jquery/plugins/cycle2/jquery.cycle2.carousel.min.js")
        //    .done(function () {
        //        //alert('cycle2.carousel loaded');
        //    })
        //    .fail(function () {
        //        alert('jquery.cycle2.carousel.min.js did not load.');
        //    });

        //}


        //TABS
        if ($('#rch-tabs').length != 0) {
            $('#rch-tabs').tabs(
                {
                    cookie: { expires: 30 },
                    select: function (event, ui) { window.location.hash = ui.tab.hash; }
                }
            );
        }

        //TABS with class
        if ($('.rch-tabs').length != 0) {
            $('.rch-tabs').tabs(
                {
                    cookie: { expires: 30 },
                    select: function (event, ui) { window.location.hash = ui.tab.hash; }
                }
            );
        }

        // Search icon
        if ($('#nav-search-icon').length != 0) {
            $("#nav-search-icon > a").click(function () {
                $("#search-field").toggle();
                $("#nav-search-icon a").toggleClass("searchOn");
                // Set focus to the search field if available.
                if ($('#query').length != 0) {
                    $('#query').focus();
                }
                if ($('.gsc-input').length != 0) {
                    $('.gsc-input').focus();
                }
            });
        } // End Search icon

        // In this section nav
        if ($('#rch-sidenav').length != 0) {

            $.getScript("../TemplateAssets/jquery/plugins/smartmenus-1.0.0-beta1/jquery.smartmenus.min.js")
              .done(function () {

                  // Link to the CSS dynamically
                  var cssId = 'smartmenu-core';
                  if (!document.getElementById(cssId)) {
                      var head = document.getElementsByTagName('head')[0];
                      var link = document.createElement('link');
                      link.id = cssId;
                      link.rel = 'stylesheet';
                      link.type = 'text/css';
                      link.href = '../TemplateAssets/jquery/plugins/smartmenus-1.0.0-beta1/css/sm-core-css.css';
                      link.media = 'screen, projection';
                      head.appendChild(link);
                  }

                  var cssId = 'smartmenu-theme-dhanuka';
                  if (!document.getElementById(cssId)) {
                      var head = document.getElementsByTagName('head')[0];
                      var link = document.createElement('link');
                      link.id = cssId;
                      link.rel = 'stylesheet';
                      link.type = 'text/css';
                      link.href = '../TemplateAssets/jquery/plugins/smartmenus-1.0.0-beta1/css/sm-simple/sm-simple.css';
                      link.media = 'screen, projection';
                      head.appendChild(link);
                  }

                  $('#rch-sidenav').smartmenus({
                      subIndicatorsPos: 'prepend',
                      subIndicatorsText: '<span class="glyphicon glyphicon-plus"></span> ',
                      markCurrentItem: true
                  });

                  //expand the sub menu automatically if one of it's children is active
                  $('#rch-sidenav').smartmenus('itemActivate', $('#rch-sidenav a.current').eq(-1));
                  $('#rch-sidenav a.current').children('span.sub-arrow').html('<span class="glyphicon glyphicon-minus"></span>')

                  // click/tap to toggle the sub menus in collapsible mode
                  var lastClicked = null;
                  $('#rch-sidenav').bind('click.smapi', function (e, item) {
                      var obj = $(this).data('smartmenus');
                      if (obj.isCollapsible()) {
                          lastClicked = item;
                          var $sub = $(item).parent().dataSM('sub');
                          if ($sub && $sub.dataSM('shown-before') && $sub.is(':visible')) {
                              obj.menuHide($sub);
                              return false;
                          }
                      }
                  });
                  $('#rch-sidenav').bind('beforehide.smapi', function (e, menu) {
                      if (lastClicked && lastClicked != $(menu).dataSM('parent-a')[0]) {
                          lastClicked = null;
                          return false;
                      }
                  });

                  $('#rch-sidenav').bind('show.smapi', function (e, menu) {
                      $(menu).dataSM('parent-a').children('span.sub-arrow').html('<span class="glyphicon glyphicon-minus"></span>');
                  });

                  $('#rch-sidenav').bind('hide.smapi', function (e, menu) {
                      $(menu).dataSM('parent-a').children('span.sub-arrow').html('<span class="glyphicon glyphicon-plus"></span>');
                  });
              })
              .fail(function () {
                  alert('smartmenus did not load.');
              });
        } // End In this section nav

        //Intranet home page

        if ($('#intranetHomePage').length != 0) {
            if ($('#intranetBulletinCarousel').length != 0) {
                $('.bulletinToolTip').popover({
                    trigger: 'hover',
                    html: true,
                    placement: 'top'
                });
            }

        } // End intranet home page

        // Home page carousel scripts
        //if ($('#rch-news-carousel').length != 0) {
        //    $.getScript("/TemplateAssets/javascripts/jc/jquery.jcarousel.js")
        //    .done(function () {
        //        // Link to the CSS dynamically
        //    })
        //        .fail(function () {
        //            alert('jquery.jcarousel.js did not load.');
        //        });

        //    $.getScript("/TemplateAssets/javascripts/jc/jcarousel.responsive.js")
        //    .done(function () {
        //        // Link to the CSS dynamically
        //    })
        //        .fail(function () {
        //            alert('jcarousel.responsive.js did not load.');
        //        });
        //}             

        if ($('#rch-featured-carousel').length != 0) {
            $('.carousel').carousel({
                //interval: 44000
				interval: 34000
            });
        }

        if ($('.rch-home-ani').length != 0) {
            $(".rch-ani-hover").hide();
            $(".rch-home-ani").mouseover(function () {
                $(".rch-ani-mouseout").hide();
                $(".rch-ani-hover").show();
            }).mouseout(function () {
                $(".rch-ani-hover").hide();
                $(".rch-ani-mouseout").show();
            });
        }
        
        // Load retina.js. Might need to be place at the end of the template before the closing body tag.
        // http://retinajs.com/
        $.getScript("../TemplateAssets/javascripts/retina-1.1.0/js/retina-1.1.0.min.js")
        .done(function () {
            // Nothing to do here...
        })
        .fail(function () {
            alert('retina.js did not load.');
        });

        if ((thisBrowserVersion >= '9') || (thisBrowserVersion === false)) {
            // Load anchor.js
            // http://bryanbraun.github.io/anchorjs/
            $.getScript("../TemplateAssets/javascripts/anchorjs-master/anchor.js")
            .done(function () {
                anchors.options.placement = 'left';
                anchors.add('#rch-primary h2, #rch-primary h3');
                anchors.remove('h2.ui-accordion-header, h2.no-anchor');
            })
            .fail(function () {
                alert('anchor.js did not load.');
            });
        }

        // TOC script
        // https://github.com/idiotWu/jQuery-TOC
        if ($('div#toc').length != 0) {
            // Load toc.js
            $.getScript("../TemplateAssets/javascripts/jQuery-TOC/dist/jquery.toc.min.js")
            .done(function () {
                var options = {
                    selector: 'h2, h3',
                    scope: '#rch-primary'
                };
                // for jQuery version
                $('div#toc span').replaceWith('');
                $('div#toc').initTOC(options);
            })
            .fail(function () {
                alert('toc.js did not load.');
            });
        }

        // This is to wrap iframe and give responsive way for the videos
        // Only will select iframes with a vimeo.com source
        $("iframe[src*='vimeo.com']").wrap("<div class='rch-videoWrapper'/>");
        //$("iframe[src*='youtube.com']").wrap("<div class='rch-videoWrapper'/>");

        //Add img-responsive class for images in content  
        if ($('#rch-primary').length != 0) {
            $("#rch-primary img").addClass('img-responsive');
            $("#rch-primary table img").removeClass('img-responsive');
            $("#rch-primary table img").removeClass('alignright tfe wp-post-image');
        }

        /////////////////////////////////////////////////
        // Start last updated
        // find "last updated" times for content blocks
        var dates = new Array();
        $('div.ContentPublishedDate time').each(function () {
            var thisDate = $(this).attr('datetime');
            dates.push(new Date(thisDate));
            $(this).hide();
        });

        // sort dates
        dates.sort(sortTheDates);

        // show most recent date in footer, then hide dates in content blocks
        // if no dates, then hide footer date.
        if (dates.length > 0) {
            // we have dates. Show the most recent one (dates[0])
            if (isNaN(dates[0])) {
                $('#rch-footer-lastupdated').hide();
            } else {
                $('#rch-footer-lastupdated').text('Last updated ' + getRchFormattedDate(dates[0]) + '.');
            }
        }
        else {
            // no dates. hide the date thing in the footer
            $('#rch-footer-lastupdated').hide();
        }

        function sortTheDates(d1, d2) {
            if (d1 > d2) return -1;
            if (d1 == d2) return 0;
            return 1;
        }

        function getRchFormattedDate(d) {
            // where parameter "d" is a valid date object
            var day = d.getUTCDate();
            var m = d.getUTCMonth();
            var y = d.getUTCFullYear();
            var rchmonth = "";
            switch (m) {
                case 0:
                    rchmonth = "January";
                    break;
                case 1:
                    rchmonth = "Febuary";
                    break;
                case 2:
                    rchmonth = "March";
                    break;
                case 3:
                    rchmonth = "April";
                    break;
                case 4:
                    rchmonth = "May";
                    break;
                case 5:
                    rchmonth = "June";
                    break;
                case 6:
                    rchmonth = "July";
                    break;
                case 7:
                    rchmonth = "August";
                    break;
                case 8:
                    rchmonth = "September";
                    break;
                case 9:
                    rchmonth = "October";
                    break;
                case 10:
                    rchmonth = "November";
                    break;
                case 11:
                    rchmonth = "December";
                    break;
                default:
                    break;
            }
            return "" + day + " " + rchmonth + " " + y;
        }
        // End last updated section

        (function () {
            var cx = '012577338366306295857:n0meswf1tg8';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
            '//www.google.com/cse/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
        })();

        //Search boxes set focus
        $('#txtKeywords').focus();
        $('gsc-i-id2').focus();

        //CCCH header images
        var ccchurl = location.pathname;
        if (ccchurl.indexOf('https://www.rch.org.au/ccch/publications-resources/chd/') > -1) {
            $('<img src="/uploadedImages/Main/Content/ccchdev/pubs-header-chd.png" class="ccch-contentHeaderImg img-responsive"  alt="Children\'s Health & Development"  title="Children\'s Health & Development" />').insertBefore("#rch-primary>div>h1");
        }
        else if ((ccchurl.indexOf('https://www.rch.org.au/ccch/publications-resources/grow-thrive/') > -1) || (ccchurl.indexOf('https://www.rch.org.au/ccch/growthrive/')) > -1) {
            $('<img src="/uploadedImages/Main/Content/ccchdev/pubs-header-grow-thrive.png" class="ccch-contentHeaderImg img-responsive"  alt="Grow &amp; Thrive"  title="Grow &amp; Thrive" />').insertBefore("#rch-primary>div>h1");
        }
        else if (ccchurl.indexOf('https://www.rch.org.au/ccch/publications-resources/pdn/') > -1) {
            $('<img src="/uploadedImages/Main/Content/ccchdev/pubs-header-pd.png" class="ccch-contentHeaderImg img-responsive"  alt="Professional Development News"  title="Professional Development News" />').insertBefore("#rch-primary>div>h1");
        }

        // Turn off the CCCH acorn if IE is less than 11, due to lack of support for 
        if ((thisBrowserVersion <= '10') && (thisBrowserVersion !== false)) {
            $("body.rch-section-ccch #rch-primary .ccch-acorn").addClass('hidden');
        }

        // When using IE11, display a hidden item with a class of ie11Alert
        if (thisBrowserVersion == '11') {
            $("body.intranet #rch-primary .ie11Alert").toggle();
        }

        //console.log('Site.init complete');
    } // End init
}; // End Site.

var Google = {
    init: function () {
        //console.log('Hostname: ' + location.hostname);

        // Only run Google stats on prod. And track downloads.
        // No need to declare blogs.rch.org.au here - has it's own copy
        if ((location.hostname == "www.rch.org.html") || (location.hostname == "ww2.rch.org.html") || (location.hostname == "secure.rch.org.html")) {
        //if (location.hostname == "ektron.local") {
            //console.log('We are on production');

            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date(); a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '../../www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-34157820-1', 'auto', {'name':'rchTracker'});
            ga('rchTracker.send', 'pageview');

            // deal with file downloads. http://www.blastam.com/blog/index.php/2013/09/howto-track-downloads-links-universalanalytics/
            var filetypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i;
            var baseHref = '';
            if (jQuery('base').attr('href') != undefined) baseHref = jQuery('base').attr('href');
            var hrefRedirect = '';

            jQuery('body').on('click', 'a', function (event) {
                var el = jQuery(this);
                var track = true;
                var href = (typeof (el.attr('href')) != 'undefined') ? el.attr('href') : '';
                var isThisDomain = href.match(document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0]);
                if (!href.match(/^javascript:/i)) {
                    var elEv = []; elEv.value = 0, elEv.non_i = false;
                    if (href.match(/^mailto\:/i)) {
                        elEv.category = 'email';
                        elEv.action = 'click';
                        elEv.label = href.replace(/^mailto\:/i, '');
                        elEv.loc = href;
                    }
                    else if (href.match(filetypes)) {
                        var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
                        elEv.category = 'download';
                        elEv.action = 'click-' + extension[0];
                        elEv.label = href.replace(/ /g, '-');
                        elEv.loc = baseHref + href;
                    }
                    else if (href.match(/^https?\:/i) && !isThisDomain) {
                        elEv.category = 'external';
                        elEv.action = 'click';
                        elEv.label = href.replace(/^https?\:\/\//i, '');
                        elEv.non_i = true;
                        elEv.loc = href;
                    }

                    else if (href.match(/^tel\:/i)) {
                        elEv.category = 'telephone';
                        elEv.action = 'click';
                        elEv.label = href.replace(/^tel\:/i, '');
                        elEv.loc = href;
                    }
                    else track = false;
                    if (track) {
                        var ret = true;
                        if ((elEv.category == 'external' || elEv.category == 'download') && (el.attr('target') == undefined || el.attr('target').toLowerCase() != '_blank')) {
                            hrefRedirect = elEv.loc;
                            ga('rchTracker.send', 'event', elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value, {
                                'nonInteraction': elEv.non_i,
                                'hitCallback': gaHitCallbackHandler
                            });

                            //console.log('GA send event: ' + elEv.category.toLowerCase() + 'for ' + elEv.label.toLowerCase());
                            ret = false;
                        }

                        else {
                            ga('rchTracker.send', 'event', elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value, {
                                'nonInteraction': elEv.non_i
                            });
                        }
                        return ret;
                    }
                }
            });

            gaHitCallbackHandler = function () {
                window.location.href = hrefRedirect;
            }
        } // end if www.rch.org.au
        //console.log('Google.init complete');
    } // End init
}; // End Google