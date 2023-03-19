PRAGMA foreign_keys = ON;

create table if not exists food_item (
    id integer PRIMARY KEY,
    name varchar(255) not null,
    description text
);

create table if not exists food_combo (
    id integer PRIMARY KEY,
    name varchar(255)
);

create table if not exists food_combo_item (
    food_combo_id integer not null,
    food_item_id integer not null,
    
    foreign key (food_combo_id)
        references food_combo (id),

    foreign key (food_item_id)
        references food_item (id),

    PRIMARY KEY (food_combo_id, food_item_id)
);

create table if not exists scheduled_delivery (
    id integer PRIMARY KEY,
    food_combo_id integer not null,
    arrival_time integer not null,

    foreign key (food_combo_id)
        references food_combo (id)
);

create index idx_food_combo__name
on food_combo (name);

create index idx_scheduled_delivery__arrival_time
on scheduled_delivery (arrival_time);