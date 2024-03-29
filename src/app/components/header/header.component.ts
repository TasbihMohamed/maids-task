import { Component } from '@angular/core';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchId: number | undefined;

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    this.searchService.setSearchValue(this.searchId || 0);
  }
}
