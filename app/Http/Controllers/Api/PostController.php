<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Tag;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [];
        try {
            $posts = Post::all();
            foreach ($posts as $post) {
                $tag = Tag::find($post->tag_id);
                $post->tag = $tag->name;
                $data = [...$data, $post];
            }

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json('Erro', 422);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $tag = Tag::find($request->tag_id);
            $post = $tag->post()->create($request->all());

            return response()->json($post, 200);
        } catch (\Throwable $th) {
            return response()->json('Erro ao cadastrar post', 422);
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
        try {
            $post = Post::find($id);

            return response()->json($post, 200);
        } catch (\Throwable $th) {
            return response()->json('Erro', 422);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $post = Post::find($id);
            $post->fill($request->all());
            $post->save();
            return response()->json($post, 200);
        } catch (\Throwable $th) {
            return response()->json('Erro', 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return response()->json(Post::destroy($id), 200);
    }
}
