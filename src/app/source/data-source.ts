
export interface Barangay {
    name: string;
    
  }

export interface Type {
    type: string;
    
  }

const TYPE: Type[] = [
  {type : 'Senior High School Student'},
  {type : 'College Student'},
  {type : 'Worker'},

];

const EXAMPLE_DATA: Barangay[] = [
    {name: 'Apil'},
    {name: 'Binuangan'},
    {name: 'Bolibol'},
    {name: 'Buenavista'},
    {name: 'Bunga'},
    {name: 'Buntawan'},
    {name: 'Burgos'},
    {name: 'Canubay'},
    {name: 'Clarin Settlement'},
    {name: 'Dolipos Bajo'},
    {name: 'Dolipos Alto'},
    {name: 'Dulapo'},
    {name: 'Dullan Norte'},
    {name: 'Dullan Sur'},
    {name: 'Lower Lamac'},
    {name: 'Layawan'},
    {name: 'Lower Langcangan'},
    {name: 'Lower Loboc'},
    {name: 'Lower Rizal'},
    {name: 'Malindang'},
    {name: 'Mialen'},
    {name: 'Mobod'},
    {name: 'Ciriaco Pastrano'},
    {name: 'Paypayan'},
    {name: 'Pines'},
    {name: 'Poblacion 1'},
    {name: 'Poblacion 2'},
    {name: 'Proper Langcangan'},
    {name: 'San Vicente Alto'},
    {name: 'San Vicente Bajo'},
    {name: 'Sebucal'},
    {name: 'Senote'},
    {name: 'Taboc Norte'},
    {name: 'Taboc Sur'},
    {name: 'Talairon'},
    {name: 'Talic'},
    {name: 'Toliyok'},
    {name: 'Tipan'},
    {name: 'Transville'},
    {name: 'Tuyabang Alto'},
    {name: 'Tuyabang Bajo'},
    {name: 'Tuyabang Proper'},
    {name: 'Upper Langcangan'},
    {name: 'Upper Lamac'},
    {name: 'Upper Loboc'},
    {name: 'Upper Rizal'},
    {name: 'Victoria'},
    {name: 'Villaflor'},
   
   

  ];

export class DataSource {
    barangay: Barangay[] = EXAMPLE_DATA;
    type: Type[] = TYPE;
    url :string = 'http://127.0.0.1:8000';
}
