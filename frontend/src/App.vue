<template>
    <div id="app" class="cols">
        <div id="viewer">
            <div id="viewer-main">
                <canvas id="viewer-canvas"></canvas>
            </div>
            <button @click="run">Execute</button>
        </div>
        <div id="editor" class="cols">var main=function() {

    var CANVAS=document.getElementById("viewer-canvas");

    /*========================= GET WEBGL CONTEXT =============== */
    var GL;
    try {
        GL = CANVAS.getContext("experimental-webgl", {antialias: true});
    } catch (e) {
        alert("You are not webgl compatible :(");
        return false;
    }

    /*========================= SHADERS ========================= */
    /*jshint multistr: true */
    var shader_vertex_source="\n\
    attribute vec2 position; //the position of the point\n\
    attribute vec3 color;  //the color of the point\n\
    \n\
    varying vec3 vColor;\n\
    void main(void) { //pre-built function\n\
        gl_Position = vec4(position, 0., 1.); //0. is the z, and 1 is w\n\
        vColor=color;\n\
    }";


    var shader_fragment_source="\n\
    precision mediump float;\n\
    \n\
    \n\
    \n\
    varying vec3 vColor;\n\
    void main(void) {\n\
        gl_FragColor = vec4(vColor, 1.);\n\
    }";


    var get_shader=function(source, type, typeString) {
        var shader = GL.createShader(type);
        GL.shaderSource(shader, source);
        GL.compileShader(shader);
        if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
            alert("ERROR IN "+typeString+ " SHADER : " + GL.getShaderInfoLog(shader));
            return false;
        }
        return shader;
    };

    var shader_vertex=get_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");

    var shader_fragment=get_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

    var SHADER_PROGRAM=GL.createProgram();
    GL.attachShader(SHADER_PROGRAM, shader_vertex);
    GL.attachShader(SHADER_PROGRAM, shader_fragment);

    GL.linkProgram(SHADER_PROGRAM);

    var _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
    var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");

    GL.enableVertexAttribArray(_color);
    GL.enableVertexAttribArray(_position);

    GL.useProgram(SHADER_PROGRAM);


    /*========================= THE TRIANGLE ========================= */
    //POINTS :
    var triangle_vertex=[
    -1,-1, //first summit -> bottom left of the viewport
    0,0,1,
    1,-1, //bottom right of the viewport
    1,1,0,
    1,1,  //top right of the viewport
    1,0,0
    ];

    var TRIANGLE_VERTEX= GL.createBuffer ();
    GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);
    GL.bufferData(GL.ARRAY_BUFFER,
    new Float32Array(triangle_vertex),
    GL.STATIC_DRAW);

    //FACES :
    var triangle_faces = [0,1,2];
    var TRIANGLE_FACES= GL.createBuffer ();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(triangle_faces),
    GL.STATIC_DRAW);



    /*========================= DRAWING ========================= */
    GL.clearColor(0.0, 0.0, 0.0, 0.0);

    var animate=function() {

        GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
        GL.clear(GL.COLOR_BUFFER_BIT);

        GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);

        GL.vertexAttribPointer(_position, 2, GL.FLOAT, false,4*(2+3),0) ;
        GL.vertexAttribPointer(_color, 3, GL.FLOAT, false,4*(2+3),2*4) ;

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
        GL.drawElements(GL.TRIANGLES, 3, GL.UNSIGNED_SHORT, 0);
        GL.flush();

        window.requestAnimationFrame(animate);
    };

    animate();
};

main();
        </div>
    </div>
</template>

<script>
import ace from 'brace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

export default {
    data: function () {
        return {
            count: 0,
            changes: 0
        }
    },
    methods: {
        increment() {
            this.count = this.count + 1
        },
        incrementChange() {
            this.changes = this.changes + 1
        },
        execute() {
            this.show = true
        },
        run() {
            if (!this.editor) return null

            const newScript = document.createElement('script')
            newScript.appendChild(
                document.createTextNode(this.editor.getValue())
            )
            const container = document.querySelector('#viewer-main')
            if (this.script) {
                container.replaceChild(newScript, this.script)
            }
            else {
                var result = container.appendChild(newScript)
            }
            this.script = newScript
        }
    },
    ready: function () {
        this.editor = ace.edit('editor')
        this.editor.getSession().setMode('ace/mode/javascript')
        this.editor.setTheme('ace/theme/monokai')
    }
}
</script>

<style>
#app {
    position: relative;
}

#app button {
    border: thin outset green;
    color: green;
    padding: 5px;
    background: none;
    transition: all .5s ease-out;
    width: 100%;
}

#app button:hover {
    border: thin solid transparent;
    color: white;
    padding: 5px;
    background: green;
}

#app button:active {
    border: thin solid green;
    font-weight: bold;
    color: green;
    padding: 5px;
    background: white;
    transition: all 0s ease;
}

#viewer {
    position: absolute;
    top: 15px;
    right: 20px;
    background: white;
    border-radius: 5px;
    padding: 5px;
    z-index: 10;
    transition: all .5s ease;
    opacity: .1;
}

#viewer:hover {
    opacity: 1;
}

#viewer-canvas {
    width: 300px;
    height: 225px;
}

.layout-vertical {
    background: #201020;
    display: flex;
    flex-flow: column;
    min-height: 400px;
}

.layout-vertical-flex {
    flex: 1 1 auto;
}

.layout-vertical-fixed {
    flex: none;
}

.item {
    margin: 5px;
    background: white;
}
</style>
