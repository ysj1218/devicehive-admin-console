/*
  DeviceHive Admin Console business logic

  Copyright (C) 2016 DataArt

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
 
      http://www.apache.org/licenses/LICENSE-2.0
 
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

  */
app.Models.TimeFilters = Backbone.Model.extend({
    initialize: function (options) {
        if (_.isEmpty(options) || !_.has(options, "startDate"))
             this.set("startDate",(new Date()).addDays(-7));
    },
    defaults: { startDate: null, endDate: null },
    getters: {
        startDateUTCString: function () {
            var startDate = this.get("startDate");
            if (_.isDate(startDate)) {
                var utcStartDate = startDate.getTime() + startDate.getTimezoneOffset() * 60000;
                return (new Date(utcStartDate)).format("yyyy-mm-dd'T'HH:MM:ss.l");
            } else {
                return null;
            }
        },
        endDateUTCString: function () {
            var endDate = this.get("endDate");
            if (_.isDate(endDate)) {
                var utcEndDate = endDate.getTime() + endDate.getTimezoneOffset() * 60000;
                return (new Date(utcEndDate)).format("yyyy-mm-dd'T'HH:MM:ss.l");
            } else {
                return null;
            }
        }
    }
});
