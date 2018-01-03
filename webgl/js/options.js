let gui;
let options =
{
	teamcolor1: "#ff9500",
	teamcolor2: "#49CC36",
	// beamOffTeam: {},
	beamOffTime: 1000,
	beamOffTeam1: function ()
	{
		for (let i = 0; i < objects.length; i++)
		{
			if (objects[i].teamNumber == 1)
			{
				console.log("iteration nr " + i);
				startBeam( objects[i], options.beamOffTime );
				return;
			}
		}
	},
	beamOffTeam2: function ()
	{
		for (let i = 0; i < objects.length; i++)
		{
			if (objects[i].teamNumber == 2)
			{
				console.log("iteration nr " + i);
				startBeam( objects[i], options.beamOffTime );
				return;
			}
		}
	}
}

window.onload = function()
{
	gui = new dat.GUI();
	// add saving
	gui.remember(options);

	let colorFolder = gui.addFolder("Teamcolors");
	let animationsFolder = gui.addFolder("Animations");
	let teamcolor1 = colorFolder.addColor(options, "teamcolor1");
	let teamcolor2 = colorFolder.addColor(options, "teamcolor2");
	// let beamOffTeam = animationsFolder.add(options, "beamOffTeam", {team1: 0, team2: 1});
	animationsFolder.add(options, "beamOffTeam1");
	animationsFolder.add(options, "beamOffTeam2");
	animationsFolder.add(options, "beamOffTime").min(10).max(5000);

	colorFolder.open();
	animationsFolder.open();

	// add events
	teamcolor1.onChange( function (value)
	{
		objects.forEach(function (element, index, arr)
		{
			if (element.material.type == "ShaderMaterial"
				&& element.teamNumber == 1)
			{
				element
					.material
					.uniforms
					.teamcolor
					.value = new THREE.Color(options.teamcolor1);
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
				element
					.material
					.uniforms
					.teamcolor
					.value = new THREE.Color(options.teamcolor2);
			}
		});
	});
};
