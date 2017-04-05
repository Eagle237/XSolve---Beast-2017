var pageSize = 5;
var buttonPaging;
var buttonPrev;
var buttonNext;
var min = 0;
var max = 0;
var filterMin; //MINIMUM ZAKRESU
var filterMax; //MAXIMUM ZAKRESU
var filterText; //SZUKANA FRAZA
var tablica = [];
var filteredSize; //ILOŚĆ ODFILTROWANYCH ELEMENTÓW


function clr() { //CZYSZCZENIE DIVA Z TABELKĄ
	document.getElementById('tab').innerHTML = "";
} //clr()


function isInt(n) { //SPRAWDZENIE CZY ZMIENNA JEST LICZBĄ CAŁKOWITĄ
	return n % 1 === 0;
} //isInt()


//PAGINACJA####################################################################################################
function paging() { //PAGINACJA ON/OFF
	if(buttonPaging.checked == true) { //PAGINACJA WŁĄCZONA
		if(filteredSize > pageSize) buttonNext.disabled = false;
		min = 0;
		max = pageSize;
	} else { //PAGINACJA WYŁĄCZONA
		buttonPrev.disabled = true;
		buttonNext.disabled = true;
		min = 0;
		max = tablica.length;
	}
	
	clr();
	show(min, max);
} //paging()


function prevPage() { //POPRZEDNIA STRONA
	var temp;
	if(max == filteredSize) {
		temp = max % pageSize;
		min -= pageSize;
		max -= temp;
		buttonNext.disabled = false;
	} else {
		min -= pageSize;
		max -= pageSize;
	}
	
	if(min <= 0) {
		min = 0;
		buttonPrev.disabled = true;
	}
	
	clr();
	show(min, max);
} //prevPage()


function nextPage() { //NASTEPNA STRONA
	min += pageSize;
	max += pageSize;
	if(max >= filteredSize) {
		max = filteredSize;
		buttonNext.disabled = true;
	}
	
	if(min > 0) buttonPrev.disabled = false;
	
	clr();
	show(min, max);
} //nextPage()


//SORTOWANIE####################################################################################################
function sortData() { //SORTOWANIE DANYCH
	var temp = [];
	
	if(document.getElementById('identyfikator').checked == true) { //SORTOWANIE PO ID
		for(i = 0; i < tablica.length - 1; i++) {
			if(tablica[i].id > tablica[i + 1].id) {
				temp[0] = tablica[i];
				tablica[i] = tablica[i + 1];
				tablica[i + 1] = temp[0];
				i = -1;
			}
		}			
	} else if(document.getElementById('imie').checked == true) { //SORTOWANIE PO IMIENIU
		for(i = 0; i < tablica.length - 1; i++) {
			if(tablica[i].firstName > tablica[i + 1].firstName) {
				temp[0] = tablica[i];
				tablica[i] = tablica[i + 1];
				tablica[i + 1] = temp[0];
				i = -1;
			}
		}
	} else if(document.getElementById('nazwisko').checked == true) { // SORTOWANIE PO NAZWISKU
		for(i = 0; i < tablica.length - 1; i++) {
			if(tablica[i].lastName > tablica[i + 1].lastName) {
				temp[0] = tablica[i];
				tablica[i] = tablica[i + 1];
				tablica[i + 1] = temp[0];
				i = -1;
			}
		}
	} else if(document.getElementById('wiek').checked == true) { //SORTOWANE PO WIEKU
		for(i = 0; i < tablica.length - 1; i++) {
			var dataIGodzina1 = tablica[i].dateOfBirth.split(" "); //ODDZIELENIE GODZINY OD DATY
			var dataUrodzenia1 = dataIGodzina1[0].split("."); //ODDZIELENIE DNI, MIESIĘCY, LAT
			var godzinaUrodzenia1 = dataIGodzina1[1].split(":"); // ODDZIELENIE GODZIN OD MINUT
			
			var dataIGodzina2 = tablica[i + 1].dateOfBirth.split(" ");
			var dataUrodzenia2 = dataIGodzina2[0].split(".");
			var godzinaUrodzenia2 = dataIGodzina2[1].split(":");
			
			if(dataUrodzenia1[2] > dataUrodzenia2[2]) { //PORÓWNANIE LAT URODZENIA
				temp[0] = tablica[i];
				tablica[i] = tablica[i + 1];
				tablica[i + 1] = temp[0];
				i = -1;
			} else if(dataUrodzenia1[2] == dataUrodzenia2[2]) {//JEŻELI LATA SĄ RÓWNE TO PORÓWNAJ MIESIĄCE
				if(dataUrodzenia1[1] > dataUrodzenia2[1]) {
					temp[0] = tablica[i];
					tablica[i] = tablica[i + 1];
					tablica[i + 1] = temp[0];
					i = -1;
				} else if(dataUrodzenia1[1] == dataUrodzenia2[1]) { //JEŻELI MIESIĄCE SĄ RÓWNE TO PORÓWNAJ DNI
					if(dataUrodzenia1[0] > dataUrodzenia2[0]) {
						temp[0] = tablica[i];
						tablica[i] = tablica[i + 1];
						tablica[i + 1] = temp[0];
						i = -1;
					} else if(dataUrodzenia1[0] == dataUrodzenia2[0]) { //JEŻELI DNI SĄ RÓWNE TO PORÓWNAJ GODZINY
						if(godzinaUrodzenia1[0] > godzinaUrodzenia2[0]) {
							temp[0] = tablica[i];
							tablica[i] = tablica[i + 1];
							tablica[i + 1] = temp[0];
							i = -1;
						} else if(godzinyUrodzenia1[0] == godzinaUrodzenia2[0]) { //JEŻELI GODZINY SĄ RÓWNE TO PORÓWNAJ MINUTY
							if(godzinyUrodzenia1[1] > godzinaUrodzenia2[1]) {
								temp[0] = tablica[i];
								tablica[i] = tablica[i + 1];
								tablica[i + 1] = temp[0];
								i = -1;
							}
						}
					}
				}
			}
		} //for
		
	} else if(document.getElementById('funkcja').checked == true) { //SORTOWANIE PO FUNKCJI
		for(i = 0; i < tablica.length - 1; i++) {
			if(tablica[i].function > tablica[i + 1].function) {
				temp[0] = tablica[i];
				tablica[i] = tablica[i + 1];
				tablica[i + 1] = temp[0];
				i = -1;
			}
		}
	} else if(document.getElementById('doswiadczenie').checked == true) { //SORTOWANIE PO DOŚWIADCZENIU
		for(i = 0; i < tablica.length - 1; i++) {
			if(tablica[i].experience > tablica[i + 1].experience) {
				temp[0] = tablica[i];
				tablica[i] = tablica[i + 1];
				tablica[i + 1] = temp[0];
				i = -1;
			}
		}
	}
	
	
	clr();
	show(min, max);
} //sortData()


//FILTROWANIE####################################################################################################
function filterRadioChange() { //KONTROLKI FILTROWANIA ON/OFF
	if(document.getElementById('ident').checked == true || document.getElementById('exp').checked == true) { //WŁĄCZENIE FILTROWANIA ZAKRESEM
		document.getElementById('fraza').disabled = true;

		document.getElementById('od').disabled = false;
		document.getElementById('do').disabled = false;
		
		document.getElementById('dataOD').disabled = true;
		document.getElementById('dataDO').disabled = true;
	} else if(document.getElementById('name').checked == true || document.getElementById('surname').checked == true || document.getElementById('function').checked == true) { //WŁĄCZENIE FILTROWANIA FRAZĄ
		document.getElementById('fraza').disabled = false;
		
		document.getElementById('od').disabled = true;
		document.getElementById('do').disabled = true;
		
		document.getElementById('dataOD').disabled = true;
		document.getElementById('dataDO').disabled = true;
	} else if(document.getElementById('DOB').checked == true) { //WŁĄCZENIE FILTROWANIA PO DACIE
		document.getElementById('fraza').disabled = true;
		
		document.getElementById('od').disabled = true;
		document.getElementById('do').disabled = true;
		
		document.getElementById('dataOD').disabled = false;
		document.getElementById('dataDO').disabled = false;
	} else if(document.getElementById('none').checked == true) { //WYŁĄCZENIE FILTROWANIA
		document.getElementById('fraza').disabled = true;
		
		document.getElementById('od').disabled = true;
		document.getElementById('do').disabled = true;
		
		document.getElementById('dataOD').disabled = true;
		document.getElementById('dataDO').disabled = true;
	}
} //filterRadioChange()

function resetFilter() { //ZRESETOWANIE USTAWIEŃ FILTRU
	for(i = 0; i < tablica.length; i++) tablica[i].condition = true;
} //resetFilter


function filterData() { //FILTROWANIE DANYCH
			
	if(document.getElementById('ident').checked == true) { //FILTROWANIE PO ID
		filterMin = parseInt(ff.od.value);
		filterMax = parseInt(ff.do.value);
		
		if(isInt(filterMin) && isInt(filterMax)) {
			if(filterMin <= filterMax) {
				resetFilter();
				for(i = 0; i < tablica.length; i++) {
					if(tablica[i].id < filterMin || tablica[i].id > filterMax) {
						tablica[i].condition = false;
					}
				}
			} else {
				alert("Niepoprawny zakres!");
			}
		} else {
			alert("Dane muszą być liczbami!");
		}
	} else if(document.getElementById('name').checked == true) { //FILTROWANIE PO IMIENIU
		filterText = ff.fraza.value.toLowerCase();

		resetFilter();
		for(i = 0; i < tablica.length; i++) {
			if(tablica[i].firstName.toLowerCase().indexOf(filterText) == -1) { //JEŻELI IMIE NIE ZAWIERA SZUKANEJ FRAZY
				tablica[i].condition = false;
			}
		}
	} else if(document.getElementById('surname').checked == true) { //FILTROWANIE PO NAZWISKU
		filterText = ff.fraza.value.toLowerCase();

		resetFilter();
		for(i = 0; i < tablica.length; i++) {
			if(tablica[i].lastName.toLowerCase().indexOf(filterText) == -1) {
				tablica[i].condition = false;
			}
		}
	} else if(document.getElementById('DOB').checked == true) { //FILTROWANIE PO DACIE URODZENIA
		var dataIGodzina; //Data i godzina urodzenia pobrana z tablicy i oddzielona na date i godzine [DD.MM.YYYY] + [HH:MM]
		var dataUrodzenia; //Data oddzielona na dni, miesiące i lata [DD] + [MM] + [YYYY]
	
		var dataMin = ff.dataOD.value.split("-"); //Data z formularza oddzielona na dni, miesiące i lata [YYYY] + [MM] + [DD]
		var dataMax = ff.dataDO.value.split("-");
		
		resetFilter();
		
		//SPRAWDZENIE POPRAWNOŚCI ZAKRESU DATY POBRANEGO Z FORMULARZA
		if(dataMax[0] < dataMin[0]) {
			alert("Niepoprawny zakres daty!");
			return 0;
		} else if(dataMax[0] == dataMin[0]) {
			if(dataMax[1] < dataMin[1]) {
				alert("Niepoprawny zakres daty!");
				return 0;
			} else if(dataMax[1] == dataMin[1]) {
				if(dataMax[2] < dataMin[2]) {
					alert("Niepoprawny zakres daty!");
					return 0;
				}
			}
		}
		
		//ODFILTROWANIE WYNIKÓW
		for(i = 0; i < tablica.length; i++) {
			dataIGodzina = tablica[i].dateOfBirth.split(" ");
			dataUrodzenia = dataIGodzina[0].split(".");
			
			if( (dataUrodzenia[2] < dataMin[0]) || (dataUrodzenia[2] > dataMax[0]) ) { //PORÓWNANIE LAT
				tablica[i].condition = false;
			} else if( (dataUrodzenia[2] == dataMin[0]) || (dataUrodzenia[2] == dataMax[0]) ) {
				if( (dataUrodzenia[1] < dataMin[1]) || (dataUrodzenia[1] > dataMax[1]) ) { //PORÓWNANIE MIESIĘCY
					tablica[i].condition = false;
				} else if( (dataUrodzenia[1] == dataMin[1]) || (dataUrodzenia[1] == dataMax[1]) ) {
					if( (dataUrodzenia[0] < dataMin[2]) || (dataUrodzenia[0] > dataMax[2]) ) { //PORÓWNANIE DNI
						tablica[i].condition = false;
					}
				}
			}
		} //for()
		
		
	} else if(document.getElementById('function').checked == true) { //FILTROWANIE PO FUNKCJI
		filterText = ff.fraza.value.toLowerCase();

		resetFilter();
		for(i = 0; i < tablica.length; i++) {
			if(tablica[i].function.toLowerCase().indexOf(filterText) == -1) {
				tablica[i].condition = false;
			}
		}
	} else if(document.getElementById('exp').checked == true) { //FILTROWANIE PO DOŚWIADCZENIU
		filterMin = parseInt(ff.od.value);
		filterMax = parseInt(ff.do.value);
		
		if(isInt(filterMin) && isInt(filterMax)) {
			if(filterMin <= filterMax) {
				resetFilter();
				for(i = 0; i < tablica.length; i++) {
					if(tablica[i].experience < filterMin || tablica[i].experience > filterMax) {
						tablica[i].condition = false;
					}
				}
			} else {
				alert("Niepoprawny zakres!");
			}
		} else {
			alert("Dane muszą być liczbami!");
		}
	} else if(document.getElementById('none').checked == true) { //BEZ FILTROWANIA
		resetFilter();
	}
	
	//PRZESUNIĘCIE ODFILTROWANYCH DANYCH NA POCZĄTEK TABLICY
	for(i = 0; i < tablica.length - 1; i++) {
		var temp;
		
		if(tablica[i].condition < tablica[i + 1].condition) {
			temp = tablica[i];
			tablica[i] = tablica[i + 1];
			tablica[i + 1] = temp;
			i = -1;
		}
	}
	
	//ZLICZENIE ELEMENTÓW ODFILTROWANYCH
	filteredSize = 0;
	for(i = 0; i < tablica.length; i++) {
		if(tablica[i].condition == true) filteredSize++;
	}
	
	clr();
	show(min, max);
} //filterData()


function main() {
	buttonPaging = document.getElementById('paginacja');
	buttonPrev = document.getElementById('prev');
	buttonNext = document.getElementById('next');
	
	//POCZĄTKOWE USTAWIENIE KONTROLEK SORTOWANIA
	document.getElementById('identyfikator').checked = true;
	document.getElementById('none').checked = true;
	
	//POCZĄTKOWE USTAWIENIE KONTROLEK FILTROWANIA
	document.getElementById('fraza').disabled = true;
	document.getElementById('od').disabled = true;
	document.getElementById('do').disabled = true;
	document.getElementById('dataOD').disabled = true;
	document.getElementById('dataDO').disabled = true;
	
	load();
} //main()


function load() { //WCZYTANIE DANYCH Z PLIKU JSON
	$.getJSON( "http://localhost/sluzba.json", function( data ) {
		for(i = 0; i < data.length; i++) {
			tablica[i] = { id: data[i].id, firstName: data[i].firstName, lastName: data[i].lastName, dateOfBirth: data[i].dateOfBirth, function: data[i].function, experience: data[i].experience, condition: true };
		}
		
		max = filteredSize = tablica.length;
		min = 0;
		
		show(min, max);
	});
} //load()


function show(min, max) { //WYŚWIETLANIE DANYCH W TABELI
	var output = "<table style=\"background-image:url('http://localhost/img/table_bgr.jpg')\" align=\"center\" border=\"1\"><tr><td>ID:</td><td>Imie:</td><td>Nazwisko:</td><td>Data urodzin:</td><td>Funkcja:</td><td>Doświadczenie:</td></tr>";
	
	if(max == "all" || max >= tablica.length) max = tablica.length;
							
	for(i = min; i < max; i++) {
		if(tablica[i].condition == true) {
			output += "<tr><td>" + tablica[i].id + "</td>";
			output += "<td>" + tablica[i].firstName + "</td>";
			output += "<td>" + tablica[i].lastName + "</td>";
			output += "<td>" + tablica[i].dateOfBirth + "</td>";
			output += "<td>" + tablica[i].function + "</td>";
			output += "<td>" + tablica[i].experience + "</td></tr>";
		}
	}
	output += "</table>";
	document.getElementById('tab').innerHTML = output;
} //show()

		