// --------- Drop-down template
let dd_template = ( { val } ) => `
<option value="${val}">${val}</option>
`;

// --------- Event-cards template
let card_template = ( { evt_title, evt_location, evt_start_time, evt_end_time, evt_desc  } ) => `
                    <div class="eventcard">
                        <div class="eventcard__header">
                           <h3>${evt_title}</h3>
                           <span class="add">+</span>
                        </div>
                        <span class="where">${evt_location}</span>
                        <span class="when">${evt_start_time} - ${evt_end_time}</span>
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
export {dd_template, card_template};