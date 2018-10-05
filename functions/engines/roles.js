/*
property descriptions (ON SHEET)

index: DEPRECATED(?)
name, rules: really

sus: appears suspicious if investigated
rbi: immune to roleblock
killer: produces an heir if killed

prep: performs action in preparation phase
tag: performs action in tagging phase
do: performs action in action phase
haunt: performs action if they die

TODO
passive: passive roles, send value to ref.choices
targetType: 'self', 'town'
*/

export default {
    a : {
        index: 0,
        name: "Informant",
        rules: "Choose a player and find out what their role is.",
        sus: true,
        targetTown : true,
        type : 1,
        priority: 400,
    },
    b : {
        index: 1,
        name: "Fugitive",
        rules: "Does not know the mafia, and the mafia do not know who he is. Can attack a player once per game.",
        sus: true,
        targetTown : true,
        type : 1,
        priority: 300,
    },
    c : {
        index: 2,
        name: "Assassin",
        rules: "Choose a player to kill. If inspected by the Detective, the Assassin will not appear suspicious.",
        targetTown: true,
        killer: true,
        type: 1,
        priority: 300,
    },
    d : {
        index: 3,
        name: "Ninja",
        rules: "Choose a player to kill.",
        sus: true,
        targetTown : true,
        killer : "e",
        type : 1,
    },
    e : {
        index: 4,
        name: "Murderer",
        rules: "Choose a player to kill.",
        sus: true,
        targetTown : true,
        killer : "e",
        type : 1,
    },
    f : {
        index: 5,
        name: "Thug",
        rules: "This role does not perform any actions.",
        sus: true,
        type : 1,
    },
    g : {
        index: 6,
        name: "Consort",
        rules: "This role does not perform any actions.",
        sus: true,
        rbi: true,
        type : 1
    },
    h : {
        index: 7,
        name: "Forger",
        rules: "Forges identities.",
        sus: true,
        type : 1
    },
    i : {
        index: 8,
        name: "Underboss",
        rules: "Enhances the ability of one of his mafia members.",
        sus: true,
        recipientMsg : 'The Underboss assisted you in doing your job!',
        targetTown : true,
        type : 1,
    },
    j : {
        index: 9,
        name: "Politician",
        rules: "Removes one player from the voting phase.",
        sus: true,
        targetTown : true,
        type : 1,
    },
    k : {
        index: 10,
        name: "Schemer",
        rules: "Makes their target suspicious for the night",
        sus: true,
        type : 1
    },
    l : {
        index: 11,
        name: "Silencer",
        rules: "Choose a player and stop them from talking for the next day.",
        sus: true,
        type : 1,
    },
    m : {
        index: 12,
        name: "Drunk",
        rules: "Drunkens all town members that voted guilty on him if he is hung.",
        sus: true,
        type : 1
    },
    n : {
        index: 13,
        name: "Voodoo",
        rules: "Curses target.",
        sus: true,
        type : 1
    },
    
    A : {
        index: 0,
        name: "Detective",
        rules: "Choose a player and discover if they are suspicious or not.",
        type : 2,
    },
    B : {
        index: 1,
        name: "Warden",
        rules: "Choose a player and watch their house. If anyone visits the selected player, the warden will be alerted.",
        tag : "watch",
        type : 2,
    },
    C : {
        index: 2,
        name: "Prophet",
        rules: "Receive information of your target through visions.",
        type : 2,
    },
    D : {
        index: 3,
        name: "Private",
        rules: "Undergo private investigations on your targets that are revealed to the public once you die.",
        type : 2,
    },
    E : {
        index: 4,
        name: "Nostalgic",
        rules: "Choose to learn the ability of a deceased town member.",
        type : 2,
    },
    F : {
        index: 5,
        name: "Listener",
        rules: "Hear where the mafia members visit during the night.",
        type : 2,
    },
    G : {
        index: 6,
        name: "Investigator",
        rules: "Choose a player and search for clues.",
        type : 2,
    },
    H : {
        index: 7,
        name: "Hunter",
        rules: "Choose a player to shoot.",
        type : 2,
    },
    I : {
        index: 8,
        name: "Soldier",
        rules: "Choose to shoot anyone who visits you during the night.",
        rbi: true,
        type : 2,
    },
    J : {
        index: 9,
        name: "Villager",
        rules: "Learn from other town members.",
        type : 2,
    },
    K : {
        index: 10,
        name: "Doctor",
        rules: "Choose someone to take care of. If they are attacked by the mafia that night, they will not die.",
        type : 2,
    },
    L : {
        index: 11,
        name: "Bodyguard",
        rules: "Choose someone to guard. If they are attacked by the mafia that night, you will fight them off.",
        type : 2,
    },
    M : {
        index: 12,
        name: "Priest",
        rules: "Bless your target with protection. If they die in any way, eveyrone will be notified that they have been healed.",
        type : 2,
    },
    N : {
        index: 13,
        name: "Keeper",
        rules: "Choose someone to guard. You will distract one random visitor during the night.",
        type : 2,
    },
    O : {
        index: 14,
        name: "Bouncer",
        rules: "Choose someone to guard. You will redirect all visits to yourself.",
        type : 2,
    },
    P : {
        index: 15,
        name: "Cupid",
        rules: "Choose a target to fall in love.",
        type : 2,
    },
    Q : {
        index: 16,
        name: "Escort",
        rules: "Choose a player and stop them from performing their action.",
        rbi: true,
        type : 2,
    },
    R : {
        index: 17,
        name: "Ritualist",
        rules: "Sacrifice yourself during the night to resurrect a town member.",
        type : 2,
    },
    S : {
        index: 18,
        name: "Mayor",
        rules: "Choose to demote a player to a villager or thug.",
        type : 2,
    },
    T : {
        index: 19,
        name: "Survivor",
        rules: "If you die, you can still communicate during the day.",
        type : 2,
    },
    U : {
        index: 20,
        name: "Painter",
        rules: "Paint any visitors during the night.",
        type : 2,
    },
    V : {
        index: 21,
        name: "Apprentice",
        rules: "Visit a player to begin learning their trade.",
        type : 2,
    }
      
}