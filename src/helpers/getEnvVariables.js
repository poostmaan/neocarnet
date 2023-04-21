export const getEnvVariables = () => {
    // import.meta.env
    // ! CUALQUIER NUEVA VARIABLE DEBE SER IMPORTADA Y EXPORTADA DE LA SIGUIENTE FORMA

    return {
        VITE_BASEURL: import.meta.env.VITE_BASEURL,
        VITE_IMAGEPATH: import.meta.env.VITE_IMAGEPATH
    }
}