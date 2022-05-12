<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;

class TagHasPostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        try {
            $tag = Tag::find($id);
            $posts = $tag->post()->get();
            foreach ($posts as $post) {
                $post->tag = $tag->name;
            }

            return response()->json($posts, 200);
        } catch (\Throwable $th) {
            return response()->json('erro', 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }
}
