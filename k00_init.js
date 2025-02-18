
/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Feb 2025
 */

"use strict";

// nadeem's graphic library
var ngl = new function(){
	
	var cnv = document.getElementById("fsCanvas")
		, gl = cnv.getContext('webgl');

	if(!gl) alert("ERROR: Your browser does not support webgl");

	this.gl = gl;

	window.addEventListener("resize" , windowResizeEvtCB , false);
	function windowResizeEvtCB(){
		cnv.width = window.innerWidth;
		cnv.height = window.innerHeight;
	}
	windowResizeEvtCB();

	this.compileShaders = function( 
		vertexShader 
		, fragmentShader ) {

		var vertShaderSRC ,fragShaderSRC , shaderProgram;

		vertShaderSRC = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource( vertShaderSRC , vertexShader );
		gl.compileShader( vertShaderSRC );

		fragShaderSRC = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource( fragShaderSRC , fragmentShader );
		gl.compileShader( fragShaderSRC );

		shaderProgram = gl.createProgram();

		gl.attachShader(shaderProgram, vertShaderSRC);
		gl.attachShader(shaderProgram, fragShaderSRC);

		return shaderProgram;

	};

	this.loadProgram = function(program){
		gl.linkProgram(program);
		gl.useProgram(program);
	};
	

	this.loadAttribute = function ( program , vertsName , verts , dim ) {
		
		// transfer data to gpu
		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer() );
		gl.bufferData(gl.ARRAY_BUFFER , verts , gl.STATIC_DRAW);

		// ---------point attribute location
		var ptr = gl.getAttribLocation( program , vertsName ) ;

		gl.vertexAttribPointer(ptr
			, dim 
			, gl.FLOAT,false,0,0
		)
		gl.enableVertexAttribArray(ptr);

		// unbind
		gl.bindBuffer(gl.ARRAY_BUFFER,null);

	};


	this.loadUniform4f= function( program,name,r,g,b,a ){
		var ptr = gl.getUniformLocation( program,name );
		gl.uniform4f(ptr,r,g,b,a);
	};
	this.loadUniform2f= function(program,name,x,y){
		var ptr = gl.getUniformLocation( program,name );
		gl.uniform2f(ptr,x,y);
	};
	this.loadUniform1f = function( program,name,i ){
		var ptr = gl.getUniformLocation( program,name );
		gl.uniform1f(ptr,i);
	};
	this.loadUniformMatrix4fv = function( program,name,mat4 ){
		var ptr = gl.getUniformLocation ( program, name );
		gl.uniformMatrix4fv(ptr, false, mat4 );
	};

	this.loadImageTexture = function(image){
		// Create a texture.
		gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());

		// Set the parameters so we can render any size image.
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		// Upload the image into the texture.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

		//gl.bindTexture(gl.TEXTURE_2D, null);// DO NOT UNBIND 
	};
	this.loadDataTexture = function(pixeldata, width, height){
		// Create a texture.
		gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		// Upload the image into the texture.
		gl.texImage2D(gl.TEXTURE_2D, 
			0,                 // level
			gl.RGBA,           // internal format
			width,                 // width
			height,                 // height
			0,                 // border
			gl.RGBA,           // format
			gl.UNSIGNED_BYTE,  // type
			pixels,            // data
		);


		//gl.bindTexture(gl.TEXTURE_2D, null);// DO NOT UNBIND 
	};

	this.configureDraw = function( red , green , blue, opacity ){

		gl.clearColor( red , green , blue , opacity );
		gl.enable(gl.DEPTH_TEST); 
		gl.viewport( 0 , 0   
			, window.innerWidth   
			, window.innerHeight );
	};
};
