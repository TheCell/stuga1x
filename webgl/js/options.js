let gui;
let options =
{
	teamcolor1: "#ff9500",
	teamcolor2: "#49CC36"
}


window.onload = function()
{
	gui = new dat.GUI();
	// add saving
	gui.remember(options);

	let colorFolder = gui.addFolder("Teamcolors");
	let teamcolor1 = colorFolder.addColor(options, "teamcolor1");
	let teamcolor2 = colorFolder.addColor(options, "teamcolor2");
	colorFolder.open();

	// add events
	teamcolor1.onChange( function (value)
	{
		objects.forEach(function (element, index, arr)
		{
			if (element.material.type == "ShaderMaterial"
				&& element.teamNumber == 1)
			{
				element.material.uniforms.teamcolor.value = new THREE.Color(options.teamcolor1);
			}
		});
	});

	teamcolor2.onChange( function (value)
	{
		objects.forEach(function (element, index, arr)
		{
			if (element.material.type == "ShaderMaterial"
				&& element.teamNumber == 2)
			{
				element.material.uniforms.teamcolor.value = new THREE.Color(options.teamcolor2);
			}
		});
	});
};
