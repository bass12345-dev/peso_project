import { Component } from '@angular/core';

@Component({
  selector: 'app-count-card',
  templateUrl: './count-card.component.html',
  styleUrls: ['./count-card.component.css']
})
export class CountCardComponent {

  count_card = [
       
                  {
                    'title' : 'All Documents',
                    'total' :  1,
                    'icon'  : 'fa-ban',
                    'bgc'  : 'l-bg-cherry'
                  },
                  {
                    'title' : 'Offices',
                    'total' :  1,
                    'icon'  : 'fa-plus',
                    'bgc'  : 'l-bg-blue-dark'
                  },
                  {
                    'title' : 'Types',
                    'total' :  1,
                    'icon'  : 'fa-plus',
                    'bgc'  : 'l-bg-green-dark'
                  },
                  {
                    'title' : 'Users',
                    'total' :  1,
                    'icon'  : 'fa-plus',
                    'bgc'  : 'l-bg-orange-dark'
                  }

                  
  ];


  ngOnInit(){

    console.log(this.count_card);
  }

}
