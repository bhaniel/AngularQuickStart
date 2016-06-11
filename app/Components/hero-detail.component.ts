import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

import {Hero} from '../classes/hero';
import {HeroService} from '../Services/hero.service';

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/Components/hero-detail.component.html',
    styleUrls: ['app/Components/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false; // true if navigated here

    constructor(private heroService:HeroService,
                private routeParams:RouteParams) {
    }

    ngOnInit() {
        let heroId = this.routeParams.get('id');
        if (heroId !== null) {
            let id = +heroId;
            this.navigated = true;
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }
    }

    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }


    goBack(savedHero:Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) {
            window.history.back();
        }
    }

}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */