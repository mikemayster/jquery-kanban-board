$('#kanban').kanban({
    titles: ['To Do' , 'In Progress' , 'Done'],
    colours: ['#00aaff','#ff921d','#00ff40'],
    items: [
        {
            id: 1,
            title: 'Test',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
            block: 'To Do',
            link: '[URL]',
            link_text: 'TEST001',
            footer: 'Someone famous'
        },
        {
            id: 2,
            title: 'Test 2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
            block: 'In Progress',
            footer: 'Someone famous'
        },
        {
            id: 3,
            title: 'Test 3',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
            block: 'In Progress',
            footer: 'Someone famous'
        },
        {
            id: 4,
            title: 'Test 4',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
            block: 'Done',
            footer: 'Someone famous'
        },
        {
            id: 5,
            title: 'Test 5',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
            block: 'Done',
            footer: 'Someone famous'
        },
    ]
});