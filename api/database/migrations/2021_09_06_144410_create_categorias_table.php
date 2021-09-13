<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateCategoriasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categorias', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 255);
            $table->text('descricao');
            $table->timestamps();
        });
        $categorias = array(
            array(
                'nome' => 'Diamante',
                'descricao' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            ),
            array(
                'nome' => 'Ouro',
                'descricao' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            ),
            array(
                'nome' => 'Prata',
                'descricao' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            ),
            array(
                'nome' => 'Bronze',
                'descricao' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            )
        );
        for ($i = 0; $i < count($categorias); $i++) {
            DB::table('categorias')->insert($categorias[$i]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categorias');
    }
}
