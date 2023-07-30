function initCanvas() {

  var $ = function (id) {
    return document.getElementById(id);
  };

  /**
   * @param {texts} Array 
   */
  function addText(texts = []) {
    let textsInstances = texts.map(text => new fabric.Text(text, { top: 100, id: text }));
    textsInstances.forEach(textInstance => {
      return textInstance.on('mousedown', function(options) {  
        console.log('Hiciste clic en el objeto de texto', options);
        activeText = options.target.id;
        // Aquí puedes realizar acciones adicionales al hacer clic en el objeto
      });
    })

    canvas.add(...textsInstances);
  }

  function changeText(option, canvas, value = '') {

    if(activeText === '') {
      console.log('no hay nada seleccionado')
      return; 
    }

    const obj = {
      'bold': {'fontWeight': 'bold'},
      'italic': {'fontStyle': 'italic'},
      'underline': {'underline': true},
      'fontSelector': {'fontFamily': value}
    }

    // newText = canvas.getItemById(activeText);

    // Obtener todos los objetos del lienzo
    var objects = canvas.getObjects();

    // Filtrar los objetos y encontrar el objeto por su identificador
    var myText = objects.find(function(object) {
      return object.id === activeText;
    });

    const prop = obj[option] || {}

    console.log(myText)

    myText.set(prop);  
    canvas.renderAll();
  }

  function setCanvasImage(img) {
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      scaleX: canvas.width / img.width,
      scaleY: canvas.height / img.height,
    });
  }

  let activeText = '';

  var canvas = new fabric.Canvas("design");
  fabric.Object.prototype.transparentCorners = false;

  // TODO: DEBEN SER EXTRAIDOS DE LA BASE DE DATOS
  const texts = addText(["nombre", "cedula", "accion"]);

  let addBackgroundbtn = document.getElementById("addBackgroundbtn");
  let toSvgBtn = document.getElementById("toSvgBtn");

  document.getElementById("subirFondo").addEventListener("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function (img) {
        setCanvasImage(img)
      });
    };
    reader.readAsDataURL(file);
  });

  const textOptions = {
    bold: document.querySelector('#bold'),
    italic: document.querySelector('#italic'),
    underline: document.querySelector('#underline'),
  }

  for (let [key, value] of Object.entries(textOptions)) {
    value.addEventListener('click', () => changeText(key, canvas))
  }

  document.querySelector('#fontSelector')
    .addEventListener('change', () => {
      changeText("fontSelector", canvas, document.querySelector('#fontSelector').value)
    }
  );

  // toSvgBtn.addEventListener("click", () => {
  //   console.log( canvas.toSVG );
  // })

  function saveToSvg() {
    return canvas.toSVG();
  }
  /** Cambiar fondo template */

  document.querySelectorAll(".carnetTemplates").forEach(el => el.addEventListener('click', function(e) {
    let imgInstance = new fabric.Image(this, {});

    setCanvasImage(imgInstance);
  }))

  
}

export { initCanvas };
