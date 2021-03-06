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
//model is an app.Models.Device
app.Views.DevicePanels = Backbone.Marionette.ItemView.extend({
    events: {
        "click .notifications-tab": "showNotifications",
        "click .commands-tab": "showCommands"
    },
    initialize: function (options) {
        this.notificationsView = null;
        this.commandsView = null;
        this.commandsTimeFilters = new app.Models.TimeFilters();
        this.notificationsTimeFilters = new app.Models.TimeFilters();

        this.initialState = options.state;
    },
    setState: function (state) {
        if (state != "notifications" && state != "commands")
            state = "commands";

        var prevState = this.state;
        //state wasn't changed. Do nothing
        if (prevState == state)
            return;

        this.state = state;

        //if setState called after initial rendering
        if (this.$el)
            this.markTab();

        this.renderCurrentPanel();

        if (!_.isUndefined(prevState))
            this.trigger("onChangeMode", this.state);
    },
    renderCurrentPanel: function () {
        var that = this;

        switch (this.state) {
            case "commands":

                //close other panels and render commands.
                if (that.notificationsView != null) {
                    that.notificationsView.close();
                    delete that.notificationsView;
                };
                if (that.commandsView == null) 
                    that.commandsView = new app.Views.Commands({ model: that.model, timeFilters: that.commandsTimeFilters });
                
                smth = that.commandsView.renderModel();
                that.commandsView.$el.html(smth);
                that.$el.append(that.commandsView.$el);
                that.commandsView.refreshCollection();
                break;
            case "notifications":

                if (that.commandsView != null) {
                    that.commandsView.close();
                    delete that.commandsView;
                };

                if (that.notificationsView == null) 
                    that.notificationsView = new app.Views.Notifications({ model: that.model, timeFilters: that.notificationsTimeFilters });
                
                smth = that.notificationsView.renderModel();
                that.notificationsView.$el.html(smth);
                that.$el.append(that.notificationsView.$el);
                that.notificationsView.refreshCollection();
                break;
        }
    },
    onClose: function () {
        if (this.commandsView != null) {
            this.commandsView.close();
            delete this.commandsView;
        };
        if (this.notificationsView != null) {
            this.notificationsView.close();
            delete this.notificationsView;
        };
    },
    onRender: function (options) {
        this.$el.addClass("device-panels");
        this.setState(this.initialState);
    },
    markTab: function () {
        var tabClassName = "." + this.state + "-tab";

        this.$el.find(".menu-item").removeClass("active");
        this.$el.find(tabClassName).addClass("active");
    },
    template: "device-panels-template",
    showNotifications: function () {
        this.setState("notifications");
    },
    showCommands: function () {
        this.setState("commands");
    }
});
