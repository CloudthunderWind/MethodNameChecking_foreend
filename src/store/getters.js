const getters = {
    user_id: state => state.user.user_id,
    user_name: state => state.user.user_name,
    isLogged: state => state.user.isLogged,
    history_list: state => state.user.history_list,
    file_to_demonstrate: state => state.data.file_to_demonstrate,
    file_to_demonstrate_paths: state => state.data.file_to_demonstrate_paths,
    file_content: state => state.data.file_content,
    readme_content: state => state.data.readme_content,
    file_type: state => state.data.file_type,
    current_path: state => state.data.current_path,
    current_name: state => state.data.current_name,
    current_path_list: state => state.data.current_path_list,
    recommend_infos: state => state.data.recommend_infos,
    param_recommend_infos: state => state.data.param_recommend_infos,
    method_block_recommends: state => state.data.method_block_recommends,
    number_of_directory_lines: state => state.data.number_of_directory_lines
};

export default getters;