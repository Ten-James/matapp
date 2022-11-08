const PreprocessData = (data: any) => {
	if (data instanceof Array) {
		return data.map((x) => PreprocessData(x));
	}
	// todo fix this hack
	return data;
};
