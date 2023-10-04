import React from 'react'

export default function HomeContent() {
    return (
        <div>
            <p className='ls-1'>
                Hi, {localStorage.getItem('username')}.
                Admin can be a powerful section of your web presence that helps you track everything. Either way, you will have a dashboard, the questions are; will it serve your needs exactly as it should? Or even better, over-deliver. To avoid all the hassle, here is a fantastic free HTML5 admin dashboard template, Admindek. It equips you with three home styles; CRM, analytics, and a default version. Pick accordingly and start moving in the right direction.F
            </p>
            <p>
            Admindek has a modern and neat look that works with numerous projects and websites regardless of the niche. The kit includes all sorts of UI elements you can use and reuse unlimited times, forms, tables, apps, extensions, you name it.
            </p>
        </div>
    )
}
