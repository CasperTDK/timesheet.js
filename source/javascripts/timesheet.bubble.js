(function() {
  'use strict';

  var Bubble = function(wMonth, min, start, end) {
    this.min = min;
    this.start = start;
    this.end = end;
    this.widthMonth = wMonth;
  };

  Bubble.prototype.formatMonth = function(num) {
    num = parseInt(num, 10);

    return num >= 10 ? num : '0' + num;
  };

  Bubble.prototype.getStartOffset = function() {
    return (this.widthMonth/12) * (12 * (this.start.getFullYear() - this.min) + this.start.getMonth());
  };

  Bubble.prototype.getFullYears = function() {
    return ((this.end && this.end.getFullYear()) || this.start.getFullYear()) - this.start.getFullYear();
  };

  Bubble.prototype.getMonths = function() {
    var fullYears = this.getFullYears();
    var months = 0;

    if (!this.end) {
      months += !this.start.hasMonth ? 12 : 1;
    } else {
      if (!this.end.hasMonth) {
        months += 12 - (this.start.hasMonth ? this.start.getMonth() : 0);
        months += 12 * (fullYears-1 > 0 ? fullYears-1 : 0);
      } else {
        months += this.end.getMonth() + 1;
        months += 12 - (this.start.hasMonth ? this.start.getMonth() : 0);
        months += 12 *(fullYears-1 > 0 ? fullYears-1 : 0);
      }
    }

    return months;
  };

  Bubble.prototype.getWidth = function() {
    return (this.widthMonth/12) * this.getMonths();
  };

  Bubble.prototype.getDateLabel = function() {
    return [
      (this.start.hasMonth ? this.formatMonth(this.start.getMonth() + 1) + '/' : '' ) + this.start.getFullYear(),
      (this.end ? '-' + ((this.end.hasMonth ? this.formatMonth(this.end.getMonth() + 1) + '/' : '' ) + this.end.getFullYear()) : '')
    ].join('');
  };

  window.TimesheetBubble = Bubble;
})();
