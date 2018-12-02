//POST A NEW PROJECT
export function postProject(projectName) {
  return fetch('/api/v1/projects', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(projectName)
  })
   .then(response => response.json())
   .then(res => location.reload())
   .then(res => console.log('Successfully posted a new Project:', JSON.stringify(res)))
   .catch(error => console.log('Error posting project:', error));
}


//GET ALL PROJECTS
export function getProjects() {
  return fetch('/api/v1/projects')
    .then(response => response.json())
    .then(data => projectsSelection(data))
    .catch(error => console.log('Error getting all project:', error));
}

function projectsSelection(projects) {
  return projects.forEach( project => {
    let newOption = $(`<option class='show-project-selection' value='${project.id}'>${project.name}</option> `)
    $('select').append(newOption)
  })
}


//POST A NEW PALETTE
export function postPalette(palette) {
  const url = `/api/v1/projects/${palette.project_id}/palettes`

  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(palette)
  })
   .then(response => response.json())
   .then(res => console.log('Successfully posted a new Palette:', JSON.stringify(res)))
   .catch(error => console.log('Error posting palette:', error));
}


//GET PALETTES FOR A SPECIFIC PROJECT
export function getPalettes(id) {
  const url = `/api/v1/projects/${id}/palettes`

  return fetch(url)
    .then(response => response.json())
    .then(data => clearPalettes(data))
    .catch(error => console.log(`Error getting palettes for Project ${id}:`, error))
}

function clearPalettes(data) {
  if ($('.palette-wrapper').length){
    $('.palette-wrapper').remove()
  }
  renderPalettes(data)
}

function renderPalettes(palettes) {
  return palettes.forEach( palette => {
    const newPalettes = `
      <div class="palette-wrapper">
        <h3 class="palette-name">${palette.name}</h3>
        <div class="hex-codes">
          <i class="fas fa-circle" style="color:${palette.hex1};" data-id="${palette.hex1}"></i>
          <i class="fas fa-circle" style="color:${palette.hex2};" data-id="${palette.hex2}"></i>
          <i class="fas fa-circle" style="color:${palette.hex3};" data-id="${palette.hex3}"></i>
          <i class="fas fa-circle" style="color:${palette.hex4};" data-id="${palette.hex4}"></i>
          <i class="fas fa-circle" style="color:${palette.hex5};" data-id="${palette.hex5}"></i>
        </div>
      <h4 class="delete-palette" value="${palette.id}">remove</h4>
    </div>`

    $('.project-palettes').append(newPalettes)
  })
}


//DELETE A PALETTE
export function deletePalette(paletteId, projectId) {
  const url = `/api/v1/projects/${projectId}/palettes/${paletteId}`

  return fetch(url, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
  })
   .then(response => response.json())
   .then(res => console.log('Successfully deleted palette:', JSON.stringify(res)))
   .catch(error => console.log('Error deleting palette:', error));
}
