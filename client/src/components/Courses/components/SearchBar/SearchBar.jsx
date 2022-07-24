import React, { useEffect, useState } from 'react';
import MyInput from '../../../../common/Input/MyInput';
import MyButton from '../../../../common/MyButton/MyButton';

function SearchBar({ onSearch, ...props }) {
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		if (searchValue === '') {
			onSearch(searchValue);
		}
	}, [searchValue]);

	return (
		<div className='d-flex align-items-center' {...props}>
			<MyInput
				value={searchValue}
				onChange={setSearchValue}
				placeholderText='Type course title or id...'
				className='flex-grow-1 mr-2'
			/>
			<MyButton onClick={() => onSearch(searchValue)} buttonText='Search' />
		</div>
	);
}

export default SearchBar;
