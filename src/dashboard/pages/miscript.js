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


    console.log(textsInstances);
  }

  function changeText(option, canvas) {

    console.log(activeText)

    if(activeText === '') {
      console.log('no hay nada seleccionado')
      return; 
    }

    const obj = {
      'bold': {'fontWeight': 'bold'},
      'italic': {'fontStyle': 'italic'},
      'underline': {'underline': true},
      'fontSize': {},
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

  let activeText = '';

  var canvas = new fabric.Canvas("design");
  fabric.Object.prototype.transparentCorners = false;

  // TODO: DEBEN SER EXTRAIDOS DE LA BASE DE DATOS
  const texts = addText(["nombre", "cedula", "accion"]);

  var imgElement = document.getElementById("my-image");
  var imgInstance = new fabric.Image(imgElement, {
    left: 0,
    top: 0,
    angle: 0,
    opacity: 0.85,
  });
  canvas.setBackgroundImage(imgInstance, canvas.renderAll.bind(canvas));

  let addBackgroundbtn = document.getElementById("addBackgroundbtn");
  let toSvgBtn = document.getElementById("toSvgBtn");

  document.getElementById("subirFondo").addEventListener("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function (img) {
        // add background image
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        });
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
    console.log(value)
    value.addEventListener('click', () => changeText(key, canvas))
  }


  toSvgBtn.addEventListener("click", ()=> console.log(canvas.toSVG()))


  // var group = $('group'),
  //     ungroup = $('ungroup'),
  //     multiselect = $('multiselect'),
  //     addmore = $('addmore'),
  //     discard = $('discard');

  //     addmore.onclick = add;

  //     multiselect.onclick = function() {
  //       canvas.discardActiveObject();
  //       var sel = new fabric.ActiveSelection(canvas.getObjects(), {
  //         canvas: canvas,
  //       });
  //       canvas.setActiveObject(sel);
  //       canvas.requestRenderAll();
  //     }

  //     group.onclick = function() {
  //       if (!canvas.getActiveObject()) {
  //         return;
  //       }
  //       if (canvas.getActiveObject().type !== 'activeSelection') {
  //         return;
  //       }
  //       canvas.getActiveObject().toGroup();
  //       canvas.requestRenderAll();
  //     }

  //     ungroup.onclick = function() {
  //       if (!canvas.getActiveObject()) {
  //         return;
  //       }
  //       if (canvas.getActiveObject().type !== 'group') {
  //         return;
  //       }
  //       canvas.getActiveObject().toActiveSelection();
  //       canvas.requestRenderAll();
  //     }

  //     discard.onclick = function() {
  //       canvas.discardActiveObject();
  //       canvas.requestRenderAll();
  //     }

  //         document.body.innerText =canvas.toSVG();
}

export { initCanvas };
