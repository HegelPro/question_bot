const transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]))

export default transpose