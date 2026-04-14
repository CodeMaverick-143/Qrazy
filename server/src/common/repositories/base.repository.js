export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findById(id, include = {}) {
    return await this.model.findUnique({
      where: { id },
      include,
    });
  }

  async findOne(where, include = {}) {
    return await this.model.findFirst({
      where,
      include,
    });
  }

  async findMany(where = {}, include = {}, orderBy = {}) {
    return await this.model.findMany({
      where,
      include,
      orderBy,
    });
  }

  async create(data, include = {}) {
    return await this.model.create({
      data,
      include,
    });
  }

  async update(id, data, include = {}) {
    return await this.model.update({
      where: { id },
      data,
      include,
    });
  }

  async delete(id) {
    return await this.model.delete({
      where: { id },
    });
  }
}
