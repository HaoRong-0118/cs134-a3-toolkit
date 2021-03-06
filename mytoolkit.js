import {SVG} from './svg.min.js';

var idle_color = "royalblue"
var hover_color = "blue"
var pressed_color = "darkblue"
var text_color = "white"
var stroke_color = "darkblue"

var draw = SVG().addTo("body").size("100%", "100%");

/**
 * This function represents the tookit.
 * Widgets available in toolkit:
 * Button, Checkbox, Radio Button, Text Box, Scroll Bar, Progress Bar, Toggle Button.
 */
var MyToolkit = (function() {
    const states = {
        IDLE: "IDLE",
        HOVER: "HOVER",
        PRESSED: "PRESSED",
        EXECUTE: "EXECUTE",
        UPDATING: "UPDATING"
    };

    /**
     * Creates a button widget with the following methods:
     * move, stateChanged, onclick,text (setter).
     * @name Button
     * @class 
     * @memberof MyToolkit
     */
    var Button = function(){
        var currentState = states.IDLE
        var stateEvent = null
        var clickEvent = null

        var button = draw.group();
        var rect = button.rect(100,50).fill(idle_color).radius(8)
        var buttonText = button.text("Button").fill(text_color).center(rect.width() / 2, rect.height() / 2);
        
        rect.mouseover(function(){
            this.fill({ color: hover_color})
            this.attr({
                cursor:"pointer"
            })
            currentState = states.HOVER
            transition();
        })
        buttonText.mouseover(function(){
            rect.fill({ color: hover_color})
            this.attr({
                cursor:"pointer"
            })
            currentState = states.HOVER
            transition()
        })
        rect.mouseout(function(){
            this.fill({ color: idle_color})
            currentState = states.IDLE
            transition()
        })
        button.mouseup(function(event){
            if(currentState == states.PRESSED){
                if (clickEvent != null) {
                    currentState = states.EXECUTE
                    transition()
                    clickEvent(event)
                }
            }
            currentState = states.HOVER;
            rect.fill({ color: hover_color }).stroke({color:stroke_color,width: '0px'})
            transition()
        })
        button.mousedown(function(){
            rect.fill({color:pressed_color}).stroke({color:stroke_color,width: '2px'})
            currentState = states.PRESSED
            transition()
        })

        function transition() {
            if (stateEvent != null) {
              stateEvent(currentState);
            }
        }
        return {
            /**
             * Moves the widget to the specified x and y coordinate
             * @date 2021-05-18
             * @param {number} x x coordinate
             * @param {number} y y coordinate
             * @returns {any}
             * @instance
             * @memberof MyToolkit.Button
             */
            move: function(x, y) {
                button.move(x, y);
            },
            /**
             * Event handler that notifies consuming code when the widget state has changed.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.Button
             */
            stateChanged:function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * Event handler that notifies consuming code when the button is clicked.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.Button
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },

            /**
             * A custom label property to set the text on the button.
             * @date 2021-05-18
             * @param {String}
             * @returns {any}
             * @instance
             * @memberof MyToolkit.Button
             */
            set text(t){
                buttonText.text(t).center(rect.width() / 2, rect.height() / 2)
            }
        }
    }
    
    /**
     * Creates a CheckBox widget with the following methods:
     * move
     * onclick
     * stateChanged
     * checkStateChanged
     * text (setter)
     * @memberof MyToolkit
     * @class 
     */
    var CheckBox = function(){
        var checkStateEvent = null;
        var stateEvent = null;
        var clickEvent = null
        var currentState = states.IDLE;
        var currentCheckState = "unchecked";

        var checked = false

        var checkbox= draw.group();

        var rect = checkbox.rect(20,20).attr({
            fill:"white",
            stroke:idle_color,
        }).radius(4)
        var innerRect = checkbox.rect(15,15).attr({
            fill:"white",
        }).move(2.5,2.5).radius(2.5)
        var checkBoxtext = checkbox.text("Check box")
        checkBoxtext.x(rect.x()+rect.width()+5)
        checkBoxtext.cy(rect.cy())

        rect.mouseover(function(){
            rect.stroke({ color: hover_color})
            this.attr({
                cursor:"pointer"
            })
            currentState = states.HOVER
            transition()
        })
        innerRect.mouseover(function(){
            rect.stroke({ color: hover_color})
            this.attr({
                cursor:"pointer"
            })
        })
        rect.mouseout(function(){
            rect.stroke({ color: 'royalblue'})
            currentState = states.IDLE
            transition()
        })
        checkbox.click(function(event){
            if(clickEvent != null){
                clickEvent(event)
            }
            if(checked ==false){
                innerRect.fill({ color: idle_color})
                checked = true
                currentCheckState = "checked"
            }
            else{
                innerRect.fill({ color: 'white'})
                checked = false
                currentCheckState = "unchecked"
            }
            if(checkStateEvent!=null){
                checkStateEvent(currentCheckState);
            }
            transition();
        })
        function transition() {
            if (stateEvent != null) {
              stateEvent(currentState);
            }
        }
        return {
            /**
             * Moves the widget to the specified x and y coordinate
             * @date 2021-05-18
             * @param {number} x x coordinate
             * @param {number} y y coordinate
             * @returns {any}
             * @instance
             * @memberof MyToolkit.CheckBox
             */
            move: function(x, y) {
                checkbox.move(x, y);
            },
            /**
             * Event handler that notifies consuming code when the checkBox is clicked.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.CheckBox
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * Event handler that notifies consuming code when the widget state has changed.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.CheckBox
             */
            stateChanged:function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * Event handler that notifies consuming code when the checked state has changed.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.CheckBox
             */
            checkStateChanged: function (eventHandler) {
                checkStateEvent = eventHandler;
            },
            /**
             * a custom label property to set the text that appears to the right of the check box.
             * @date 2021-05-18
             * @param {String} text
             * @returns {any}
             * @instance
             * @memberof MyToolkit.CheckBox
             */
            set text(text){
                checkBoxtext.text(text)
                checkBoxtext.x(rect.x()+rect.width()+5)
                checkBoxtext.cy(rect.cy())
            }
        }
    }

    /**
     * Creates a RadioButton widget with the following methods:
     * move
     * stateChanged
     * checkStateChanged
     * Note: Only one could be selected
     * @param {array} options Two dimensional array which contains the information about the radio buttons.
     *      [String, boolean] maps to one radio button on the widget.
     * @memberof MyToolkit
     * @class 
     */
    var RadioButton = function(options){
        var checkStateEvent = null ; 
        var stateEvent = null;
        var currentState = states.IDLE;

        var radioWidget = draw.group();
        let offset = null;

        let outerCircles = [];
        let innerCircles = [];

        const selectOption = (index,innerCircles) =>{
            for (let i = 0; i < innerCircles.length; i++) {
                if(i == index){
                    innerCircles[i].show()
                    innerCircles[i].cx(outerCircles[i].cx());
                    innerCircles[i].cy(outerCircles[i].cy());
                    continue;
                }
                innerCircles[i].hide()
            }
        }

        const uniqueSelected = (options)=>{
            let index = -1
            let found = false
            for (let i = 0; i < options.length; i++) {
                if(options[i][1] === true && !found){
                    index = i 
                    found = true
                    continue;
                }
                options[i][1]=false
            }
        }

        function transition() {
            if (stateEvent != null) {
              stateEvent(currentState);
            }
        }

        uniqueSelected(options)
        for(let option of options){
            let button = radioWidget.group();
            let outerCircle = button.circle(20).stroke({color: idle_color}).fill({color: 'white'})
            let innerCircle = button.circle(13).fill({color: idle_color})
            let text = button.text(option[0])
            innerCircle.cx(outerCircle.cx())
            innerCircle.cy(outerCircle.cy())
            text.x(outerCircle.x()+outerCircle.width()+5);
            text.cy(outerCircle.cy());
            if(offset){
                button.y(offset+5)
            }
            if(option[1] === false){
                innerCircle.hide()
            }
            offset = button.y()+outerCircle.height()
            outerCircles.push(outerCircle)
            innerCircles.push(innerCircle)
        }
        
        for(let i = 0; i<options.length; i++){
            outerCircles[i].mouseover(()=>{
                outerCircles[i].stroke({ color: hover_color})
                outerCircles[i].attr({
                    cursor:"pointer"
                })
                innerCircles[i].attr({
                    cursor:"pointer"
                })
                currentState = states.HOVER
                transition()
            })
            innerCircles[i].mouseover(()=>{
                outerCircles[i].stroke({ color: hover_color})
                currentState = states.HOVER
                transition()
            })
            outerCircles[i].mouseout(()=>{
                outerCircles[i].stroke({ color: idle_color})
                currentState = states.IDLE
                transition()
            })
            outerCircles[i].click(function(event){
                selectOption(i,innerCircles)
                if(checkStateEvent != null){
                    checkStateEvent(i);
                }
            })
        }

        return{
            /**
             * Moves the widget to the specified x and y coordinate
             * @date 2021-05-18
             * @param {number} x x coordinate
             * @param {number} y y coordinate
             * @returns {any}
             * @instance
             * @memberof MyToolkit.RadioButton
             */
            move: function (x, y) {
                radioWidget.move(x, y);
            },
            /**
             * Event handler that notifies consuming code when the widget state has changed.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.RadioButton
             */
            stateChanged:function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * Event handler that notifies consuming code when the checked state has changed and which n has been checked.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.RadioButton
             */
            checkStateChanged: function (eventHandler) {
                checkStateEvent = eventHandler;
            }
        }

    }

    /**
     * Creates a TextBox widget with the following methods:
     * move
     * stateChanged
     * textChanged
     * text (getter)
     * @memberof MyToolkit
     * @class 
     */
    var TextBox = function(){
        var textChangedEvent = null;
        var stateEvent = null;
        var currentState = states.IDLE

        var textbox = draw.group();
        var rect = textbox.rect(200,30).fill("white").stroke({color:idle_color,width:1.5})
        var text = textbox.text("").x(rect.x()+5).cy(rect.cy());
        var caret = textbox.rect(1,22).fill({color: idle_color})
        caret.hide()
        
        SVG.on(window, "keyup", (event) => {
            let prevState = currentState
            let prevText = text.text()
            switch(event.key){
                case "Control":{break}
                case "Shift":{break}
                case "Backspace":{
                    let newText = text.text().substring(0,text.text().length-1)
                    text.text(newText)
                    caret.x(rect.x() + text.length()+6)
                    if(prevText !== text.text()){
                        if (textChangedEvent != null) {
                            textChangedEvent(text);
                          }
                    }
                    break;
                }
                default:{
                    if(text.length() < rect.width()-14){  //left and right margin 10px and 2px for next char
                        text.text(text.text() + event.key);
                        text.cy(rect.cy());
                        caret.x(rect.x() + text.length()+6)
                        if(prevText !== text.text()){
                            if (textChangedEvent != null) {
                                textChangedEvent(text);
                              }
                        }
                    }
                }
            }
        })
        rect.mouseover(function(){
            this.attr({
                cursor:"text"
            })
            currentState = states.HOVER
            transition()
        })
        rect.mouseout(function(){
            rect.stroke({color:idle_color,width:1.5})
            caret.hide()
            currentState = states.IDLE
            transition()
        })
        rect.click(function(){
            caret.show()
            caret.move(rect.x() + text.length()+6, 0);
            caret.cy(rect.cy())
            var runner = caret.animate().width(0);
            runner.loop(1000, 1, 0);
            rect.stroke({color:hover_color,width:2})
            currentState = states.UPDATING
            transition()
        })
        function transition() {
            if (stateEvent != null) {
              stateEvent(currentState);
            }
        }
        return {
            /**
             * Moves the widget to the specified x and y coordinate
             * @date 2021-05-18
             * @param {number} x x coordinate
             * @param {number} y y coordinate
             * @returns {any}
             * @instance
             * @memberof MyToolkit.TextBox
             */
            move: function(x,y){
                textbox.move(x,y)
            },
            /**
             * Event handler that notifies consuming code when the widget state has changed.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.TextBox
             */
            stateChanged:function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * Event handler that notifies consuming code when the text has changed.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.TextBox
             */
            textChanged: function (eventHandler) {
                textChangedEvent = eventHandler;
            },

            /**
             * custom property to get the text entered by the user.
             * @date 2021-05-18
             * @returns {String}
             * @instance
             * @memberof MyToolkit.TextBox
             */
            get text(){
                return text.text()
            }
        }
    }

    /**
     * Creates a ScrollBar widget with the following methods:
     * move
     * stateChanged
     * thumbMoved
     * thumbPosition (getter)
     * height (setter)
     * @memberof MyToolkit
     * @class 
     */
    var ScrollBar = function(){
        var currentState = states.IDLE
        var stateEvent = null
        var thumbMovedEvent = null

        var scrollbar = draw.group()
        var rect = scrollbar.rect(15,200).stroke({color: idle_color, opacity: "0.7"}).fill({color:"white"}).radius(2)

        var topButton = scrollbar.group();
        var topSquare = topButton.rect(rect.width(), rect.width()).fill({ color: idle_color, opacity: "0.7"}).move(rect.x(), rect.y());
        var topArrow = topButton.polygon("30,0 10,20 50,20").size(rect.width()*0.65,rect.width()*0.65).fill({color:"navy"})
        topArrow.cy(topSquare.cy())
        topArrow.cx(topSquare.cx())

        var bottomButton = scrollbar.group();
        var bottomSquare = bottomButton.rect(rect.width(), rect.width()).fill({ color: idle_color, opacity: "0.7" }).move(rect.x(),rect.height()-rect.width());
        var bottomArraow = bottomButton.polygon("30,30 10,0 50,0").size(rect.width()*0.65,rect.width()*0.65).fill({color:"navy"})
        bottomArraow.cy(bottomSquare.cy())
        bottomArraow.cx(bottomSquare.cx())

        var thumb = scrollbar.rect(rect.width(),rect.height()/10).fill({ color: idle_color, opacity: "0.7" }).radius(2)
        thumb.cx(rect.cx())
        thumb.y(topSquare.height())

        scrollbar.mouseover(function(){
            currentState = states.HOVER
            transition()
        })
        scrollbar.mouseout(function(){
            currentState = states.IDLE
            transition()
        })
        topButton.mouseover(function(){
            topSquare.fill({ color: idle_color, opacity: "1"})
        })
        topButton.mouseout(function(){
            topSquare.fill({ color: idle_color, opacity: "0.7"})
        })
        topButton.click(function(){
            let ceiling = rect.y()+topSquare.height()
            let step = (rect.height()-2*rect.width())/15
            if(thumb.y()-step <= ceiling){
                thumb.y(ceiling)
            }
            else(
                thumb.y(thumb.y() - step)
            )
            if(thumbMovedEvent != null){
                thumbMovedEvent("up");
            }
        })


        bottomButton.mouseover(function(){
            bottomSquare.fill({ color: idle_color, opacity: "1"})
        })
        bottomButton.mouseout(function(){
            bottomSquare.fill({ color: idle_color, opacity: "0.7"})
        })
        bottomButton.click(function(){
            let floor = rect.y()+rect.height()-2*rect.width()
            let step = (rect.height()-2*rect.width())/15
            if(thumb.y()+step >= floor){
                thumb.y(floor)
            }
            else(
                thumb.y(thumb.y() + step)
            )
            if(thumbMovedEvent != null){
                thumbMovedEvent("down");
            }
        })
        var pressedThumb = false
        thumb.mouseover(function(){
            thumb.fill({ color: idle_color, opacity: "1"})
        })
        thumb.mouseout(function(){
            thumb.fill({ color: idle_color, opacity: "0.7"})
        })
        thumb.mousedown(function(event){
            thumb.fill({ color: "navy", opacity: "0.9"})
            pressedThumb = true
            currentState = states.UPDATING
            transition()
        })
        thumb.mouseup(function(){
            thumb.fill({ color: idle_color, opacity: "1"})
            pressedThumb = false
            currentState = states.HOVER
            transition()
        })

        SVG.on(thumb, "mouseleave", (event) => {
            pressedThumb = false
        })
        thumb.mousemove(function (event) {  
            let newYposition = event.offsetY        
            if(pressedThumb){
                if(newYposition < topSquare.y()+topSquare.height()+thumb.height()*1/2){
                    return
                }
                if(newYposition > topSquare.y()+rect.height()-bottomSquare.height()-thumb.height()*1/2){
                     return
                }
                if(newYposition < thumb.y()){
                    if(thumbMovedEvent != null){
                        thumbMovedEvent("up");
                    }
                }
                if(newYposition > thumb.y()){
                    if(thumbMovedEvent != null){
                        thumbMovedEvent("down");
                    }
                }
                thumb.cy(newYposition);
            }
        })

        function transition() {
            if (stateEvent != null) {
              stateEvent(currentState);
            }
          }
        return {
            /**
             * Moves the widget to the specified x and y coordinate
             * @date 2021-05-18
             * @param {number} x x coordinate
             * @param {number} y y coordinate
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ScrollBar
             */
            move: function(x,y){
                scrollbar.move(x,y)
            },
            /**
             * Event handler that notifies consuming code when the widget state has changed.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ScrollBar
             */
            stateChanged:function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * Event handler that notifies consuming code when the scroll thumb has moved and in which direction.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ScrollBar
             */
            thumbMoved:function(eventHandler){
                thumbMovedEvent = eventHandler
            },

            /**
             * Custom property to get the position of the scroll thumb.
             * @date 2021-05-18
             * @returns {number}
             * @instance
             * @memberof MyToolkit.ScrollBar
             */
            get thumbPosition(){
                return thumb.y()
            },
            /**
             * Custom property to set the height of the scroll bar.
             * @date 2021-05-18
             * @param {number} number
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ScrollBar
             */
            set height(number){
                rect.height(number)
                bottomButton.move(rect.x(),rect.height()-rect.width());
            }
        }
    }

    /**
     * Creates a ScrollBar widget with the following methods:
     * move
     * stateChanged
     * progressIncremented
     * increment
     * @memberof MyToolkit
     * @class 
     */
    var ProgressBar = function(){
        var currentState = states.IDLE;
        var stateEvent = null;
        var incrementEvent = null;
        
        var progressbar = draw.group()
        var rect = progressbar.rect(200,5).stroke({color:idle_color}).fill("white").radius(3)
        var percentageBar = progressbar.rect(0,5).fill({color:idle_color,opacity:"0.7"}).radius(3)
        percentageBar.cy(rect.cy())
        percentageBar.x(rect.x())

        progressbar.mouseover(function(){
            rect.fill({color:idle_color,opacity:"0.1"})
            rect.stroke({color:hover_color})
            currentState = states.HOVER;
            transition();
        })
        progressbar.mouseout(function(){
            rect.stroke({color:idle_color}).fill("white")
            currentState = states.IDLE
            transition();
        })
        function transition() {
            if (stateEvent != null) {
              stateEvent(currentState)
            }
        }

        return{
            /**
             * Moves the widget to the specified x and y coordinate
             * @date 2021-05-18
             * @param {number} x x coordinate
             * @param {number} y y coordinate
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ProgressBar
             */
            move: function(x,y){
                progressbar.move(x,y)
            },
            /**
             * Event handler that notifies consuming code when the widget state has changed.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ProgressBar
             */
            stateChanged: function (eventHandler) {
                stateEvent = eventHandler
            },
            /**
             * Event handler that notifies consuming code when the progress bar has incremented
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ProgressBar
             */
            progressIncremented: function(eventHandler){
                incrementEvent = eventHandler
            },

            /**
             * Custom method to increment the value of the progress bar. The method should support an arbitrary numerical value from 0-100.
             * @date 2021-05-18
             * @param {number} number percentage to increment
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ProgressBar
             */
            increment: function(number){
                if(number < 0 || number >100){
                    return
                }
                let value = (percentageBar.width()*100)/rect.width();
                let incrementedValue = ((value+number) > 100) ? 100: (value+number)
                percentageBar.width(rect.width()*incrementedValue/100)
                if(incrementEvent != null){
                    incrementEvent("incremented")
                }
            },
            /**
             * custom property to set the width of the progress bar.
             * @date 2021-05-18
             * @param {number} width Numberical Value of the width
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ProgressBar
             */
            set width(width){
                rect.width(width);
            },
            /**
             * Custom property to set the width of the progress bar.
             * @date 2021-05-18
             * @param {number} number
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ProgressBar
             */
            set incrementValue(number){
                percentageBar.width(rect.width()*number/100)
            },

            /**
             * Custom property to get the increment value of the progress bar.
             * @date 2021-05-18
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ProgressBar
             */
            get incrementValue(){
                return (percentageBar.width()*100)/rect.width()
            }
        }
    }

    /**
     * Creates a Toggle Button widget with the following methods:
     * move
     * stateChanged
     * toggleStateChanged
     * resize
     * @memberof MyToolkit
     * @class 
     */
    var ToggleButton = function() {
        var currentState = states.IDLE;
        var stateEvent = null;
        var currentToggleState = "off";
        var toggleEvent = null;

        var button = draw.group()
        var rect = button.rect(35,20).radius(10).fill({color:"lightgrey"})
        var circle = button.circle(15).fill({color:"white"})
        circle.cy(rect.cy())
        circle.x(rect.x()+3)

        button.mouseover(function(){
            this.attr({
                cursor:"pointer"
            })
            if(currentToggleState == "off"){
                rect.fill({color:"grey"})
            }
            if(currentToggleState == "on"){
                rect.fill({color:hover_color})
            }
            currentState = states.HOVER;
            transition();
        })

        button.mouseout(function(){
            if(currentToggleState == "off"){
                rect.fill({color:"lightgrey"})
            }
            if(currentToggleState == "on"){
                rect.fill({color:idle_color})
            }
            currentState = states.IDLE
            transition();
        })

        button.click(function(){
            if(currentToggleState == "off"){
                circle.animate().move(rect.x()+rect.width()-circle.width()-rect.width()*0.08,circle.y())
                rect.fill({color:idle_color})
                currentToggleState = "on"
            }
            else if(currentToggleState == "on"){
                circle.animate().move(rect.x()+rect.width()*0.08,circle.y())
                currentToggleState = "off"
            }
            if(toggleEvent!=null){
                toggleEvent(currentToggleState);
            }
        })

        function transition() {
            if (stateEvent != null) {
              stateEvent(currentState);
            }
        }
        return{
            /**
             * Moves the widget to the specified x and y coordinate
             * @date 2021-05-18
             * @param {number} x x coordinate
             * @param {number} y y coordinate
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ToggleButton
             */
            move: function(x, y) {
                button.move(x, y);
            },
            /**
             * Event handler that notifies consuming code when the widget state has changed.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ToggleButton
             */
            stateChanged: function (eventHandler) {
                stateEvent = eventHandler;
            },
            /**
             * Event handler that notifies consuming code when the toggle state has changed.
             * @date 2021-05-18
             * @param {function} eventHandler
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ToggleButton
             */
            toggleStateChanged: function (eventHandler) {
                toggleEvent = eventHandler;
            },

            /**
             * Custom method to reset the size of the toggle button. default size:35,
             * @date 2021-05-18
             * @param {number} number width of the toggle button
             * @returns {any}
             * @instance
             * @memberof MyToolkit.ToggleButton
             */
            resize: function(number){
                rect.width(number).radius(number*2/7)
                rect.height(number*4/7)
                circle.width(number*3/7)
                circle.x(rect.x()+number*0.08)
                circle.cy(rect.cy())
            },
        }
    }

return {Button,CheckBox,TextBox,RadioButton,ScrollBar,ProgressBar,ToggleButton}
}());

export{MyToolkit}