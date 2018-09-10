import RSVP from 'rsvp';
import Service from '@ember/service';

export default Service.extend({
  language: 'en',

  init() {
    this._super(...arguments);

    this.googlePackages = this.googlePackages || ['corechart', 'bar', 'line', 'scatter'];
  },

  loadPackages() {
    const { google: { charts } } = window;

    return new RSVP.Promise((resolve, reject) => {
      const packagesAreLoaded = charts.loader;

      if (packagesAreLoaded) {
        resolve();
      } else {
        charts.load('current', {
          language: this.get('language'),
          packages: this.get('googlePackages'),
        });

        charts.setOnLoadCallback((ex) => {
          if (ex) { reject(ex); }

          resolve();
        });
      }
    });
  },
});
