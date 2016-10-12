FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('MainLayout',   {
            main: 'Home'
        });
    }
});

FlowRouter.route('/post/:id', {
    name: 'post-single',
    action() {
        BlazeLayout.render('MainLayout', {
            main: 'PostSingle'
        });
    }
});
