var trees = [
  '[[;green;black]                                                                                                    ]',
  '[[;green;black]             = 7 7=77I77 7??,                                                                       ]',
  '[[;green;black]             7:77,77++.?~7.?7=~7                                                                    ]',
  '[[;green;black]      7 777777+..,:II,.7:.:~7.~=                                       77   7                       ]',
  '[[;green;black]      7  =7 7,.I7:.7.I.,~7.7.77  7                                    :                             ]',
  '[[;green;black]      77~+77777.+7~...::~.,.=+7 .77   7       .    7               7.  7: =  :7,..                  ]',
  '[[;green;black]  777777.+.77.7.++.77I7.....77 .7. ? 7        7~77 7 7        7 7   .  .:..7..7..          7        ]',
  '[[;green;black]  ~77777I7,..,.=...7.?7..~7=+,,:77  I.      7+     ,,              ..7 ...+...... 7 ...  .          ]',
  '[[;green;black]  7=~77.77:,:7:.+.,.7~.7. +7..~.,777.~         ,,+7~        77.      777...7:77.7 ....77.  .        ]',
  '[[;green;black]    7,.77.:,.=7~..,7.?....:.+....  +.  7   ~~ :,7 ,,              . . ....I7..7...=7..~. .   .      ]',
  '[[;green;black]    77.:7..:7..77...  .~..~.::,:...      7    7   ,.   :7       ...=7.77....7..7+.7,......+. . +7   ]',
  '[[;green;black]    77.~:.~............7.7:..,..~77    7 7 77   ...7+        7  7  .7,......7....:.......~.7..=77   ]',
  '[[;green;black]77  77...==.?.~?.....?:..I7:.:.7+..7~7  .      ....7. . .     :. 77  ,.7...~,.........7.....77777   ]',
  '[[;green;black]  777,I.+.7,I=.....77......I.7..=7I.,,:  . 7 ..,,,,:  .   77     ,7....~...7..7.......77.....?777   ]',
  '[[;green;black]77=:.=~77..+,......+....,7....?7?,..:7         ,,,,     7 .7      :...~?........7..7..I....,=7=.  7 ]',
  '[[;green;black]  77+.~777777,I7.............~7.7:I,?~+,~ ~,7+,  ,,:7I,   ... ,...~...,...7.7?.7...~+~.....I ~..?   ]',
  '[[;green;black]7 7.7~I.=I7777:.:...,.....=7~=,:7+7,I7,+=  ,:  77,7,==7,, 777777.= 77777........7.7I.7........I.7   ]',
  '[[;green;black]  7=.+?77.~.,7...........777I=:?~..+~?    ,+=77=7..77I,,,,  =.7    =...7?7.:..7...7:....77.77?7~+   ]',
  '[[;green;black] 777+,77,=~7?=777....7...:=....I:777,:I7 ,.,77.....=..777 ~7, ..+.,7 .....7...7... ....7  I.777     ]',
  '[[;green;black]+7~~7+.+7....+7.7....7..7,.      + ,,  ,=7  777.......+. :777I.7    7 .   ....=+7...77:I 77....77   ]',
  '[[;green;black] 777.7....=::?~7.....7..  7          777=      ..I..:77  ,+,77,  77~  7. 7+77..777...7777 7.7.?~7777]',
  '[[;green;black]       77,I77  7  7..7. 7            7 ,        7,,,,.    7,,,       , ~ .7 . ..7..    ,77 7 7 .:   ]',
  '[[;green;black]      777777  77  7..~.                    7 , 7.~,:,   .7,=,,        ..  7    ...7   777.77, 777   ]',
  '[[;green;black]                  7....                      7  7 ,: ~.             7           ..      7  7 .I     ]',
  '[[;#614126;black]                  7~..                            ,~777,7                      7..77                ]',
  '[[;#614126;black]                  77..                        ~   ,7  7                         ..7                 ]',
  '[[;#614126;black]                    ..                          ,7,7                            ..7                 ]',
  '[[;#614126;black]                   +..7                       7. 7.                             ..                  ]',
  '[[;#614126;black]                   ...                         7  .                             ,.                  ]',
  '[[;#614126;black]                  7...                          7 .                              .+                 ]',
  '[[;#614126;black]                  7...                          7 ,                              ..77               ]',
  '[[;#614126;black]                   ...                          7 ,                              .~7                ]',
  '7777         777  7... 7                     7,,,:,,,.......:...........................=?7  I......',
  '................................................................,....,.,..:.........................',
  '.................................................................,...:...............,..,........,..',
  '....................................................................................................',
  '....................................................................................................',
  ' '
];

var stars = [
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                           ..                                                                       ]',
  '[[;yellow;black]                                                             *                 . 7                  ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                    .                                               ]',
  '[[;yellow;black]                                 7.                                                                 ]',
  '[[;yellow;black]                                                                       .                            ]',
  '[[;yellow;black]                                                                       .                            ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]              .                                                                              ..     ]',
  '[[;yellow;black]                                               .                                                    ]',
  '[[;yellow;black]                                                                   *                                ]',
  '[[;yellow;black]                                                                                   7                ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                         .                                                          ]',
  '[[;yellow;black]                    *                                                                               ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                              .                                ..                                   ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]            .                                                                     .                 ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                          ..                                                        ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                            .7                                      ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]           7                                                                                      ? ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                             .                      ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                  .                 ]',
  '[[;yellow;black]                                            ..                                                      ]',
  '[[;yellow;black]                                            7                                                       ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]           .                                                                                        ]',
  '[[;yellow;black]          77                                                                                        ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                           ..                        .      .7                                      ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                           7                     .  ]',
  '[[;yellow;black]                                                                           .                        ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                7                                                                   ]',
  '[[;yellow;black]                                .                                                                   ]',
  '[[;yellow;black]                                                                                         .          ]',
  '[[;yellow;black]         7.                                                                                         ]',
  '[[;yellow;black]          .                                                   .                                     ]',
  '[[;yellow;black]                                                                                           .        ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                                                                                    ]',
  '[[;yellow;black]                                              7                                                     ]',
  '[[;yellow;black]                                              ..                                                    ]',
  '[[;yellow;black]                                              7                                                     ]',
  '[[;yellow;black]                                                                                                    ]'
];