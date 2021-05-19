import {MyToolkit} from './mytoolkit.js';
import { SVG } from './svg.min.js';

SVG.on(document,'DOMContentLoaded',function(){
	//Button
	var btn = new MyToolkit.Button();
	btn.text = "Button"
	btn.move(10,10)
	btn.onclick(function(e){
		console.log("Button clicked");
	});
	btn.stateChanged(function(e){
		console.log("Button state changed to: "+ e)
	})

	//Check Box
	var CheckBox = new MyToolkit.CheckBox();
	CheckBox.move(10,80)
	CheckBox.text = "Check Box"
	CheckBox.checkStateChanged(function(event){
		console.log("CheckBox Check state changed to: "+ event)
	})
	CheckBox.stateChanged(function(e){
		console.log("CheckBox widget state changed to: "+ e)
	})

	//Radio Button
	var options = [
		["Option 1", false],
		["Option 2", false],
		["Option 3", false],
		["Option 4", false]
	]
	var RadioButton = new MyToolkit.RadioButton(options)
	RadioButton.move(10,120)
	RadioButton.checkStateChanged(function(event){
		console.log("Radio Button check state changed to: "+ event)
	})
	RadioButton.stateChanged(function(e){
		console.log("Radio Button widget state changed to: "+ e)
	})

	//TextBox Bar
	var TextBox = new MyToolkit.TextBox()
	TextBox.move(10,250)
	console.log()
	TextBox.stateChanged(function(e){
		console.log("TextBox widget state changed to: "+ e)
	})
	TextBox.textChanged(function(event){
		console.log("Text changed to: ", TextBox.text)
	})

	//Scroll Bar 
	var ScrollBar = new MyToolkit.ScrollBar()
	ScrollBar.height=200
	ScrollBar.move(280,10)

	ScrollBar.stateChanged(function(e){
		console.log("ScrollBar widget state changed to: "+ e)
	})
	ScrollBar.thumbMoved(function(e){
		console.log("ScrollBar thumb moved: ",e)
	})

	//Progress Bar
	var ProgressBar = new MyToolkit.ProgressBar()
	ProgressBar.move(10, 320)
	ProgressBar.width = 150
	let progArray = [0,10,20,30,40,50,60,70,80,90,100]
	let i = 0
	setInterval(function(){
		if(i<=10){
			ProgressBar.incrementValue = progArray[i]
			i++
		}
		else{
			i=0
			ProgressBar.incrementValue = progArray[i]
			i++
		}
	},300)
	ProgressBar.stateChanged(function(e){
		console.log("ProgressBar widget state changed to: "+ e)
	})
	ProgressBar.progressIncremented(function(e){
		console.log(e)
	})

	//Toggle Button
	var ToggleButton = new MyToolkit.ToggleButton()
	ToggleButton.move(10,350)
	ToggleButton.resize(45)
	ToggleButton.stateChanged(function(e){
		console.log("Toggle Button widget state changed to: "+ e)
	})
	ToggleButton.toggleStateChanged(function(e){
		console.log("Toggle State Changed to: " +  e)
	})
})

