// --------- Drop-down template
let dd_template = ( { val } ) => `
<option value="${val}">${val}</option>
`;

// --------- Event-cards template
let card_template = ( { evt_code, evt_title, evt_location, evt_start_time, evt_end_time, evt_desc  } ) => {
    var st = evt_start_time.replace(/\s+/g, '');
    if (st.indexOf(":00") !== -1)
    {
        st = st.replace(":00", "");
    }
    var et = evt_end_time.replace(/\s+/g, '');
    if (et.indexOf(":00") !== -1)
    {
        et = et.replace(":00", "");
    }
    return `
                    <div class="eventcard">
                        <div class="eventcard__header">
                           <h3>${evt_title}</h3>
                           <span data-eventId="${evt_code}" class="add"></span>
                        </div>
                        <span class="where">
                           <svg class="icon-pin">
                              <use href="#icon-pin" xlink:href="#icon-pin"></use>
                           </svg>
                           ${evt_location}
                        </span>
                        <span class="when">
                           <svg class="icon-clock">
                              <use href="#icon-clock" xlink:href="#icon-clock"></use>
                           </svg>
                           ${st}-${et}
                        </span>
                        <div>
                           <button class="accordion">
                              <span>Show more</span>
                              <svg class="icon-arrow">
                                 <use href="#icon-arrow" xlink:href="#icon-arrow"></use>
                              </svg>
                           </button>
                           <div class="panel">
                              <p class="body">
                              ${evt_desc}
                              </p>
                           </div>
                        </div>
                     </div>`;
                    };

// --------- Event-cards template
let planner_template = ( { evt_code, evt_title, evt_location, evt_start_time, evt_end_time, evt_desc, evt_clash  } ) => `
<div class="eventcard">
                        <div class="eventcard__header">
                            <p class="time">${evt_start_time} - ${evt_end_time}
                       ${evt_clash ? `<span class="alert"><svg class="icon-alert">
                       <use href="#icon-alert" xlink:href="#icon-alert"></use>                           
                       </svg>
                            This clashes with another session. 
                            </span> 
                            `:`
                             `}
                            </p>
                            <a href="#" data-eventId="${evt_code}" class="remove-from-planner">Remove</a>
                        </div>
                        <div class="eventcard__body row">
                            <div class="flexContainer--qtr">
                                <h3>${evt_title}</h3>
                            </div>
                            <div class="flexContainer--3qtr">
                                <span class="where">
                                    <svg class="icon-pin">
                                        <use href="#icon-pin" xlink:href="#icon-pin"></use>
                                    </svg>
                                    ${evt_location}
                                </span>
                                <div>
                                    <button class="accordion active">
                                        <span>Show more</span>
                                        <svg class="icon-arrow">
                                            <use href="#icon-arrow" xlink:href="#icon-arrow"></use>
                                        </svg>
                                    </button>
                                    <div class="panel">
                                        <p class="body">
                                        ${evt_desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

export {dd_template, card_template, planner_template};