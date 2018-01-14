let gui;
let options =
{
	teamcolor1: "#ff9500",
	teamcolor2: "#49CC36",
	enableEnemyTeam: false,
	beamOffTime: 1000,
	beamOffTeam1: function ()
	{
		for (let i = 0; i < objects.length; i++)
		{
			if (objects[i].teamNumber == 1)
			{
				console.log("start beam");
				startBeam( objects[i], options.beamOffTime );
			}
		}
	},
	beamOffTeam2: function ()
	{
		for (let i = 0; i < objects.length; i++)
		{
			if (objects[i].teamNumber == 2)
			{
				startBeam( objects[i], options.beamOffTime );
			}
		}
	},
	team1hologramm: false,
	team2hologramm: false,
	team1Enemyhologramm: false,
	team2Enemyhologramm: false,
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
	let enemyTeam = colorFolder.add(options, "enableEnemyTeam");
	// let beamOffTeam = animationsFolder.add(options, "beamOffTeam", {team1: 0, team2: 1});
	animationsFolder.add(options, "beamOffTeam1");
	animationsFolder.add(options, "beamOffTeam2");
	animationsFolder.add(options, "beamOffTime").min(10).max(5000);
	let team1hologramm = animationsFolder.add(options, "team1hologramm");
	let team2hologramm = animationsFolder.add(options, "team2hologramm");
	let team1Enemyhologramm = animationsFolder.add(options, "team1Enemyhologramm");
	let team2Enemyhologramm = animationsFolder.add(options, "team2Enemyhologramm");

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

				if (element.isEnemy)
				{
					let hslArr = rgbToHsl(
						hexToR(options.teamcolor1),
						hexToG(options.teamcolor1),
						hexToB(options.teamcolor1));
					hslArr[0] += 0.3;
					hslArr[0] %= 1.0;

					element
						.material
						.uniforms
						.teamcolor
						.value = new THREE.Color(
							"hsl(" + hslArr[0] * 360 + ", " + Math.round(hslArr[1] * 100) + "%, " + Math.round(hslArr[2] * 100) + "%)");
				}
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

				if (element.isEnemy)
				{
					let hslArr = rgbToHsl(
						hexToR(options.teamcolor2),
						hexToG(options.teamcolor2),
						hexToB(options.teamcolor2));
					hslArr[0] += 0.3;
					hslArr[0] %= 1.0;

					element
						.material
						.uniforms
						.teamcolor
						.value = new THREE.Color(
							"hsl(" + hslArr[0] * 360 + ", " + Math.round(hslArr[1] * 100) + "%, " + Math.round(hslArr[2] * 100) + "%)");
				}
			}
		});
	});

	team1hologramm.onChange( function (value)
	{
		objects.forEach(function (element, index, arr)
		{
			if (element.material.type == "ShaderMaterial"
				&& element.teamNumber == 1 && !element.isEnemy)
			{
				element
					.material
					.uniforms
					.isHologramm
					.value = options.team1hologramm;
			}
		});
	});

	team2hologramm.onChange( function (value)
	{
		objects.forEach(function (element, index, arr)
		{
			if (element.material.type == "ShaderMaterial"
				&& element.teamNumber == 2 && !element.isEnemy)
			{
				element
					.material
					.uniforms
					.isHologramm
					.value = options.team2hologramm;
			}
		});
	});

	// Setup enemy callbacks
	enemyTeam.onChange( function (value)
	{
		objects.forEach(function (element, index, arr)
		{
			if (element.isEnemy)
			{
				element.visible = options.enableEnemyTeam;
			}
		});
	});

	team1Enemyhologramm.onChange( function (value)
	{
		objects.forEach(function (element, index, arr)
		{
			if (element.material.type == "ShaderMaterial"
				&& element.teamNumber == 1 && element.isEnemy)
			{
				element
					.material
					.uniforms
					.isHologramm
					.value = options.team1Enemyhologramm;
			}
		});
	});

	team2Enemyhologramm.onChange( function (value)
	{
		objects.forEach(function (element, index, arr)
		{
			if (element.material.type == "ShaderMaterial"
				&& element.teamNumber == 2 && element.isEnemy)
			{
				element
					.material
					.uniforms
					.isHologramm
					.value = options.team2Enemyhologramm;
			}
		});
	});
};
