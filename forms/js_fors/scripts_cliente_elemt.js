







// Para manejar la opción de seleccionar "TODOS" en tus campos de ubicaciones consulares y CAS, necesitas actualizar tanto las funciones de filtrado como la lógica que añade ubicaciones a la selección. La idea es que al seleccionar "TODOS", se añadan todas las ubicaciones disponibles a la selección.

// Aquí te muestro cómo puedes modificar el código para que la opción "TODOS" funcione correctamente:
// 1. Modificaciones en JavaScript
// Actualizar Listas de Ubicación: Ya has incluido "TODOS" en las listas de ubicaciones consulares y CAS.
// Actualizar Función addLocationToSelection: Modificar esta función para manejar el caso en el que se selecciona "TODOS".
// Lista de ubicaciones consulares para el primer campo






// Lista de ubicaciones consulares
const ubicacionConsularList = [
    'Guadalajara', 'Hermosillo', 'Matamoros', 'Monterrey', 'Nuevo Laredo',
    'Cd Mexico', 'Nogales', 'Tijuana', 'Ciudad Juarez', 'TODOS'
];

// Lista de ubicaciones CAS
const ubicacionCASList = [
    'Guadalajara AS', 'Hermosillo AS', 'Matamoros AS', 'Monterrey AS', 'Nuevo Laredo AS',
    'Cd Mexico AS', 'Nogales AS', 'Tijuana AS', 'Ciudad Juarez AS', 'TODOS'
];

// Lista de países
const countries = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
    'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo',
    'Jalisco', 'Mexico', 'Mexico City', 'Michoacan', 'Morelos', 'Nayarit', 'Nuevo Leon',
    'Oaxaca', 'Puebla', 'Queretaro', 'Quintana Roo', 'San Luis Potosi', 'Sinaloa', 'Sonora',
    'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatan', 'Zacatecas'
];

// Función para filtrar y mostrar ubicaciones consulares en el campo de texto
function filterUbicacionConsular() {
    const input = document.getElementById('ubicacion_consular');
    const filter = input.value.toLowerCase();
    const suggestions = document.getElementById('ubicacion-consular-suggestions');
    suggestions.innerHTML = '';

    if (filter.length === 0) return;

    const filteredLocations = ubicacionConsularList.filter(location => 
        location.toLowerCase().includes(filter)
    );

    filteredLocations.forEach(location => {
        const div = document.createElement('div');
        div.textContent = location;
        div.onclick = () => {
            addLocationToSelection(location, 'ubicacion_consular');
            updateInputValue('ubicacion_consular');
            suggestions.innerHTML = ''; // Limpia las sugerencias
        };
        suggestions.appendChild(div);
    });
}

// Mostrar todas las ubicaciones consulares cuando el campo de texto recibe el foco
function showAllUbicacionConsular() {
    const input = document.getElementById('ubicacion_consular');
    const suggestions = document.getElementById('ubicacion-consular-suggestions');
    suggestions.innerHTML = '';

    ubicacionConsularList.forEach(location => {
        const div = document.createElement('div');
        div.textContent = location;
        div.onclick = () => {
            addLocationToSelection(location, 'ubicacion_consular');
            updateInputValue('ubicacion_consular');
            suggestions.innerHTML = ''; // Limpia las sugerencias
        };
        suggestions.appendChild(div);
    });
}

// Función para filtrar y mostrar ubicaciones CAS en el campo de texto
function filterUbicacionCAS() {
    const input = document.getElementById('ubicacion_CAS');
    const filter = input.value.toLowerCase();
    const suggestions = document.getElementById('ubicacion-CAS-suggestions');
    suggestions.innerHTML = '';

    if (filter.length === 0) return;

    const filteredLocations = ubicacionCASList.filter(location => 
        location.toLowerCase().includes(filter)
    );

    filteredLocations.forEach(location => {
        const div = document.createElement('div');
        div.textContent = location;
        div.onclick = () => {
            addLocationToSelection(location, 'ubicacion_CAS');
            updateInputValue('ubicacion_CAS');
            suggestions.innerHTML = ''; // Limpia las sugerencias
        };
        suggestions.appendChild(div);
    });
}

// Mostrar todas las ubicaciones CAS cuando el campo de texto recibe el foco
function showAllUbicacionCAS() {
    const input = document.getElementById('ubicacion_CAS');
    const suggestions = document.getElementById('ubicacion-CAS-suggestions');
    suggestions.innerHTML = '';

    ubicacionCASList.forEach(location => {
        const div = document.createElement('div');
        div.textContent = location;
        div.onclick = () => {
            addLocationToSelection(location, 'ubicacion_CAS');
            updateInputValue('ubicacion_CAS');
            suggestions.innerHTML = ''; // Limpia las sugerencias
        };
        suggestions.appendChild(div);
    });
}

// Función para añadir una ubicación consular o CAS a la selección
function addLocationToSelection(location, type) {
    const selectedLocationsDiv = document.getElementById(`${type}-selected-countries`);
    const allLocations = type === 'ubicacion_consular' ? ubicacionConsularList : ubicacionCASList;

    if (location === 'TODOS') {
        // Eliminar todas las ubicaciones actuales
        while (selectedLocationsDiv.firstChild) {
            selectedLocationsDiv.removeChild(selectedLocationsDiv.firstChild);
        }

        // Añadir todas las ubicaciones
        allLocations.filter(loc => loc !== 'TODOS').forEach(loc => {
            const span = document.createElement('span');
            span.textContent = loc;
            span.className = 'selected-country';
            span.onclick = () => {
                selectedLocationsDiv.removeChild(span);
                updateInputValue(type);
            };
            selectedLocationsDiv.appendChild(span);
        });

        return;
    }

    // Eliminar "TODOS" si está presente
    const todosElement = Array.from(selectedLocationsDiv.children).find(child => child.textContent === 'TODOS');
    if (todosElement) {
        selectedLocationsDiv.removeChild(todosElement);
    }

    // Añadir la nueva ubicación seleccionada
    const existingLocation = Array.from(selectedLocationsDiv.children).find(child => child.textContent === location);

    if (!existingLocation) {
        const span = document.createElement('span');
        span.textContent = location;
        span.className = 'selected-country';
        span.onclick = () => {
            selectedLocationsDiv.removeChild(span);
            updateInputValue(type);
        };
        selectedLocationsDiv.appendChild(span);
    }
}

// Función para actualizar el campo de texto con las ubicaciones seleccionadas
function updateInputValue(type) {
    const input = document.getElementById(type);
    const selectedLocationsDiv = document.getElementById(`${type}-selected-countries`);
    const selectedLocations = Array.from(selectedLocationsDiv.children).map(child => child.textContent);

    if (selectedLocations.length === 0) {
        input.value = '';
    } else {
        input.value = selectedLocations.join(', ');
    }
}

// Función para filtrar y mostrar países en el campo de texto
function filterCountries() {
    const input = document.getElementById('pais');
    const filter = input.value.toLowerCase();
    const suggestions = document.getElementById('pais-autocomplete-suggestions');
    suggestions.innerHTML = '';

    if (filter.length === 0) return;

    const filteredCountries = countries.filter(country => 
        country.toLowerCase().includes(filter)
    );

    filteredCountries.forEach(country => {
        const div = document.createElement('div');
        div.textContent = country;
        div.onclick = () => {
            input.value = country; // Establece el valor en el campo de texto
            suggestions.innerHTML = ''; // Limpia las sugerencias
        };
        suggestions.appendChild(div);
    });
}

// Mostrar todos los países cuando el campo de texto recibe el foco
function showAllCountries() {
    const input = document.getElementById('pais');
    const suggestions = document.getElementById('pais-autocomplete-suggestions');
    suggestions.innerHTML = '';

    countries.forEach(country => {
        const div = document.createElement('div');
        div.textContent = country;
        div.onclick = () => {
            input.value = country; // Establece el valor en el campo de texto
            suggestions.innerHTML = ''; // Limpia las sugerencias
        };
        suggestions.appendChild(div);
    });
}

