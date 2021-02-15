<?php

if (isset($_GET['text-num'])) {
    $pok_api_link = 'https://pokeapi.co/api/v2/pokemon/';
    $pok_api = $pok_api_link . $_GET['text-num'];
    $pok_json = file_get_contents($pok_api);
    $pok_array = json_decode($pok_json, true);

    $pok_name = $pok_array['name'];
    $pok_id = $pok_array['id'];
    $pok_img = $pok_array['sprites']['front_default'];
    $pok_weight = $pok_array['weight'];
    $pok_height = $pok_array['height'];
    $pok_moves = array_slice($pok_array['moves'], 0, 4);

    $species_api = $pok_array['species']['url'];
    $species_json = file_get_contents($species_api);
    $species_array = json_decode($species_json, true);
    $evolves_from = $species_array['evolves_from_species'];
    if (!empty($evolves_from)) {
        $evolves_from_name = $evolves_from['name'];
        $evolves_from_api = $pok_api_link . $evolves_from_name;
        $evolves_from_array = json_decode(file_get_contents($evolves_from_api), true);
        $evolves_from_image = $evolves_from_array['sprites']['front_default'];
        $evolves_from_id = $evolves_from_array['id'];
    }



}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Megrim&display=swap" rel="stylesheet">
    <link href="//db.onlinewebfonts.com/c/f4d1593471d222ddebd973210265762a?family=Pokemon" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="style.css">
    <meta charset="UTF-8">
    <title>Pokédex</title>
</head>
<body>
<header>
    <h1>Pokédex</h1>
</header>

<div class="superContainer" id="superContainer">
    <div class="main-container" id="main-container">
        <div class="main-screen" id="main-screen">
            <div class="front-sprite" id="front-sprite">
                <img id="poke-sprite" src="<?php echo $pok_img ?>" alt="woops">
                <p id="poke-name"><?php echo $pok_name ?></p>
                <p id="poke-id"><?php echo $pok_id ?></p>
            </div>
            <div class="weight" id="weight"><?php echo $pok_weight ?></div>
            <div class="height" id="height"><?php echo $pok_height ?></div>
        </div>
        <div class="type-screen" id="type-screen">
            <div class="type1-s" id="type1-s"></div>
            <div class="type2-s" id="type2-s"></div>
        </div>
        <div class="buttons" id="buttons">
            <a href="" class="btn-up" id="btn-up">Next evolution</a>
            <a href="index.php?text-num=<?php echo $pok_id + 1 ?>" class="btn-r" id="btn-r">Next pokémon</a>
            <a href="index.php?text-num=<?php echo $evolves_from_id ?>" class="btn-down" id="btn-down">Previous evolution</a>
            <a href="index.php?text-num=<?php echo $_GET['text-num'] - 1 ?>" class="btn-l" id="btn-l">Previous pokémon</a>
        </div>
    </div>
    <div class="right-container" id="right-container">
        <div class="move-screen" id="move-screen">
            <div class="move1" id="move1"><p class="moves"><?php echo $pok_moves[0]['move']['name'] ?></p></div>
            <div class="move2" id="move2"><p class="moves"><?php echo $pok_moves[1]['move']['name'] ?></p></div>
            <div class="move3" id="move3"><p class="moves"><?php echo $pok_moves[2]['move']['name'] ?></p></div>
            <div class="move4" id="move4"><p class="moves"><?php echo $pok_moves[3]['move']['name'] ?></p></div>
        </div>
        <div class="evolutions" id="evolutions">
            <img src="<?php echo $evolves_from_image ?>" alt="" id="img-1">
            <img src="<?php echo $pok_img ?>" alt="" id="img-2">
            <img src="" alt="" id="img-3">
        </div>
        <div class="input-field" id="input-field">
            <form method="get">
                <input type="text" id="text-num" name="text-num" placeholder=" Pokémon name or id">
            </form>
        </div>
    </div>
</div>


<!-- <script src="pokedex.js"></script> -->
</body>
</html>
