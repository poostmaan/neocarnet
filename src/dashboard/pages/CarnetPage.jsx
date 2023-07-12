import { DashboardLayout } from "../layouts";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { Box, Grid, Button, Typography, Alert, AlertTitle } from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import StayPrimaryLandscapeIcon from "@mui/icons-material/StayPrimaryLandscape";
import StayPrimaryPortraitIcon from "@mui/icons-material/StayPrimaryPortrait";
import { useCarnetStore } from '../../hooks';
import { ChipFields } from "../components";
import { width } from "@mui/system";
// import { initCanvas } from "./miscript";

export const CarnetPage = () => {
  const fileInputRef = useRef();

  const canvasRef = useRef(null)

  const {
    startSavingCarnet,
    startLoadingCarnet,
    activeCarnet,
    fields: currentFields ,
    loading
  } = useCarnetStore();

  //** Extraer de algun lado */
  const fields = ["nombre", "cedula", "accion"];
  const fieldsInUse = activeCarnet?.fields?.split(",") || []; 

  const [svg, setSvg] = useState({})

  const handleExportSvg = () => {
    const { svgCode, json } = svg;

    console.log(svgCode);
    let fields = currentFields.toString();
    startSavingCarnet({ contentsvg: svgCode, contentjson: json, fields })
  }

  useEffect(() => {
    startLoadingCarnet();
    console.log(activeCarnet)
  }, [])
  

  useEffect(() => {
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

    function removeText(texts = []) {

      const textObjects = texts.map(text => {
        var objects = canvas.getObjects();
  
      // Filtrar los objetos y encontrar el objeto por su identificador
        var myText = objects.find(function(object) {
          return object.id === text;
        });

        canvas.remove(myText);
      });


      canvas.renderAll();
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
        'fontSelector': {'fontFamily': value},
        'fontColor': {'fill': value}
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

    function toggleField(field) {
      console.log(field)
      const elem = document.getElementById(field)
      if(!elem) return;
      console.log(elem)

      elem.addEventListener("click", function() {
        if([...this.classList].includes("chip-active")) {
          removeText([elem.textContent], canvas);
          this.classList.remove('chip-active');
        } else {
          addText([elem.textContent])
          this.classList.add('chip-active'); 
        }
      })
    }
  
    let activeText = '';
  
    var canvas = new fabric.Canvas(canvasRef.current);
    fabric.Object.prototype.transparentCorners = false;

    if(activeCarnet.id) {

      // ! Codigo para cargar en el canvas un SVG

      // fabric.loadSVGFromString(activeCarnet.content, (objects, options) => {
      //   const svgObject = fabric.util.groupSVGElements(objects, options);
  
      //   // svgObject.ungroup();
  
      //   svgObject.getObjects().forEach((obj) => {
      //     obj.set('selectable', true);
      //   });
  
      //   canvas.add(...svgObject.getObjects());
      //   canvas.renderAll();
      // });

      canvas.loadFromJSON(activeCarnet.contentjson);

      const objects = canvas.getObjects();
      const textObjects = objects.filter(obj => obj.type === 'text');

      textObjects.forEach((obj) => {
        if (obj.type === 'text') { 
          obj.set('id', obj.text);
        }
      });

      textObjects.forEach(textInstance => {
        return textInstance.on('mousedown', function(options) {
          activeText = options.target.id;
        });
      })

    } else {
      // TODO: DEBEN SER EXTRAIDOS DE LA BASE DE DATOS
      // const texts = addText(["nombre", "cedula", "accion"]);
  
      // let rect = new fabric.Rect({
      //   left: 100,    // Posición izquierda del rectángulo
      //   top: 100,     // Posición superior del rectángulo
      //   width: 100,   // Ancho del rectángulo
      //   height: 100,  // Altura del rectángulo
      //   fill: '#ddd'  // Color de relleno del rectángulo
      // });
  
      // // Crear un nuevo texto
      // let text = new fabric.Text('foto', {
      //   fontSize: 20,                      // Tamaño de fuente del texto
      //   fill: 'black',                     // Color de relleno del texto
      //   left: rect.left + rect.width / 2,  // Posición horizontal centrada
      //   top: rect.top + rect.height / 2,   // Posición vertical centrada
      //   originX: 'center',                 // Origen X centrado
      //   originY: 'center'                  // Origen Y centrado
      // });

      // let group = new fabric.Group([rect, text], {
      //   left: rect.left,
      //   top: rect.top
      // });
      // canvas.add(group);
      fabric.Image.fromURL('https://neocarnets.neoaplicaciones.com/carnets/iconos/default.png', function(img) {
        // Configurar propiedades de la imagen
        img.set({
          left: 100,
          top: 100,
          width: 200,
          height: 200
        });

        // Añadir la imagen al lienzo
        canvas.add(img);
      });
    }

    let addBackgroundbtn = document.getElementById("addBackgroundbtn");
    // let toSvgBtn = document.getElementById("toSvgBtn");
  
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

    fields.forEach(field => toggleField(field));
    
    // * Cambiar la fuente
    document.querySelector('#fontSelector')
      .addEventListener('change', () => {
        changeText("fontSelector", canvas, document.querySelector('#fontSelector').value)
      }
    );

    // * Cambiar el color
    document.querySelector('#fontColor')
      .addEventListener('change', () => {
        changeText("fontColor", canvas, document.querySelector('#fontColor').value)
      }
    );

    // * Exportar el carnet
    toSvgBtn.addEventListener("click", () => {
      // setSvg(canvas.toSVG());
      setSvg({
        svgCode: canvas.toSVG(),
        json: JSON.stringify(canvas)
      })
    })

    /** *Cambiar fondo template */
  
    document.querySelectorAll(".carnetTemplates").forEach(el => el.addEventListener('click', function(e) {
      let imgInstance = new fabric.Image(this, {});
  
      setCanvasImage(imgInstance);
    }))
   
    
  }, [])

  return (
    <DashboardLayout>
      {/* <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button> */}
      <Grid container>
        {/* <Grid item md={2}>
          <Box sx={{
            display: 'flex',
            flexDirection: "column",  
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ddd",
            mb: 2,
            py:4
          }}>
            <span>Vertical</span>
            <StayPrimaryPortraitIcon />  
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: "column",  
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ddd",
            py: 4
          }}>
            <span>Horizontal</span>
            <StayPrimaryLandscapeIcon /> 
          </Box>
        </Grid> */}
        <Grid item md={9}>
            <button id="bold"><b>N</b></button>
            <button id="italic"><i>I</i></button>
            <button id="underline"><u>U</u></button>
            &nbsp;
            Fuente: 
            &nbsp;
            <select id="fontSelector">
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
              <option value="Georgia">Georgia</option>
              <option value="Impact">Impact</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
            </select>
            &nbsp;
            Color:
            &nbsp;
            <input type="color" id="fontColor"/>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: "#ddd",
              mx: 2,
            }}
          >
            
            <Box
              sx={{
                height: "500px",
                width: "318px",
                backgroundColor: "#ccc",
                borderRadius: "20px",
              }}
            >
              <canvas id="design" ref={canvasRef} width="318" height="500"></canvas>
            </Box>
          </Box>
        </Grid>
        <Grid item md={3}>
          <input
            type="file"
            name="subirFondo"
            id="subirFondo"
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <Typography>Sugerencia de fondos: </Typography>
          <Box
            sx={{
              display: "flex",
              mb: 2,
            }}
          >
            {imageTemplates.map((img) => (
              <img src={img} key={img} width="65" height="95" alt="image" className="carnetTemplates pointer"/>
            ))}
          </Box>

          <Box
            sx={{mb: 1}}
          >
            { 
            
            fields.map((field) => (
              <ChipFields field={field} active={ fieldsInUse.includes(field) } />
            ))
            
            }
          </Box>
          
          <Button
            id="addBackgroundbtn"
            onClick={() => {
              fileInputRef.current.click();
            }}
            variant="outlined"
            fullWidth
            sx={{ mb: 1 }}
          >
            Agregar fondo personalizado
          </Button>
          <Button id="toSvgBtn" variant="outlined" fullWidth onClick={handleExportSvg} disabled={loading}>
            Guardar
          </Button>

          <Alert severity="success" sx={{ position: "absolute", bottom: 12, right:12, width: "300px",display: loading ? "block" : "none" }}>
            <AlertTitle>Perfecto!</AlertTitle>
            Se ha guardado el carnet con <strong>éxito</strong>
          </Alert>
          
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

const imageTemplates = [
  "https://neocarnets.neoaplicaciones.com/assets/bussinessTemplates/fvb.png",
  "https://neocarnets.neoaplicaciones.com/assets/bussinessTemplates/asturiano.png",
];
